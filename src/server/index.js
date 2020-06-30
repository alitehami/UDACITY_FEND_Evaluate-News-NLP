const dotenv = require("dotenv").config();
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { url } = require("inspector");
const aylienAPI = require("aylien_textapi");

const aylien = new aylienAPI({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY,
});

let port = process.env.PORT;
console.log(`Your API KEY is ${process.env.API_KEY}`);
console.log(`Your APP ID key is ${process.env.API_ID}`);

let projectData = [];

const app = express();
app.use(cors());
// to use json
app.use(bodyParser.json());
// to use url encoded values
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static("dist"));

// spin up the server
app.listen(port, function () {
  console.log(`the app is listening on http://localhost:${port}`);
});

app.get("/", function (req, res) {
  res.sendFile("dist/");
});


const x =
  "\n---------------------------------------------------------------------------------\n";

app.post("/aylienPOST", async (request, response) => {
  let req = await request.body;
  console.log(`----\nNew Entry Recieved\n`);

  try {
    const x = await getAylienAnalysis(req);
    (async () => {
      await console.log(x);
    })();
    console.log("passed aylien call function...");
    response.send("success!");
  } catch (err) {
    console.log("failed aylien call function...");
    console.error(err);
    response.send(`error occured:\n${err}`);
  }
});

function getAylienAnalysis(req) {
  let data = {
    endpoint: [
      "sentiment",
      "extract",
      "summarize",
      "concepts",
      "entities",
      "language",
      "hashtags",
      "classify",
    ],
  };
  // check for url or text input
  if (req.textTest) {
    data.text = req.textTest;
  } else {
    data.url = req.urlTest;
  }
  console.log("logging the data input:\n-----\n", data);
  let analysisResult = null;
  aylien.combined(data, async (err, result) => {
    if (err === null) {
      analysisResult = await result;
      projectData.push(analysisResult);
      console.log("\n-----\nlogging the results:\n-----\n", analysisResult);
      return analysisResult;
    } else {
      console.log("ERRORRRROROROROR.......");
      console.log(err);
      return err;
    }
  });
}

//sending last entry data back to the front-end
app.get("/getLastEntry", async (request, response) => {
  try {
    let i = projectData.length;
    console.log(`\nGET REQUEST FOR LAST ENTRY\nall recorded entries (${i}):`);
    let sendData = false;
    if (i !== 0) {
      sendData = projectData[i - 1];
    }
    // console.log("-----");
    // console.log(x, JSON.stringify(sendData), x);
    response.send(dataCleaner(sendData, "sentiment"));
  } catch (error) {
    console.error(error);
    response.send(`failed! ${error.message}`);
  }
});

//a great handy tool to help navigating & generating the json response attribute paths
//https://jsonpathfinder.com/

//Cleaninig up the Aylien api response
function dataCleaner(json, endpointType) {
  if (!json) {
    return {};
  }
  console.log(json, "this is it!");
  const data = json.results;
  const dataArray = [];
  data.forEach((d) => {
    console.log(`endpoint is ${d.endpoint}`);
    if (endpointType === d.endpoint) {
      let format = null;
      let i = d.result;

      switch (d.endpoint) {
        case "sentiment":
          let perc =
            parseFloat(i.polarity_confidence) >= 0.5
              ? "is most likely"
              : "might be";
          format = `The Tone of this text ${perc} ${i.polarity}<br><br>The Text is:<br>${json.text}<br><br><hr><br><br>${JSON.stringify(json.results)}`;
          dataArray.push(format);
          // code block
          break;

        case "extract":
          // code block
          break;

        case "summarize":
          //
          break;

        case "concepts":
          //
          break;

        case "entities":
          //
          break;

        case "language":
          //
          break;

        case "hashtags":
          //
          break;

        case "classify":
          //
          break;

        default:
          false;
      }
    }
  });
  return { dataArray };
}
