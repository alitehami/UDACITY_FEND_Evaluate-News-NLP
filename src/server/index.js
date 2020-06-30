const dotenv = require("dotenv").config();
const path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
const { url } = require("inspector");
const bodyParser = require("body-parser");
const cors = require("cors");
const aylienAPI = require("aylien_textapi");

const aylien = new aylienAPI({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY,
});
// const getAylienAnalysis = require("./aylienAPI.js");

let port = process.env.PORT;

let projectData = [];

let json = {
  title: "test json response",
  message: "this is a message",
  time: "now",
};

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
  console.log(`Example app listening on http://localhost:${port}`);
});

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

const x =
  "\n---------------------------------------------------------------------------------\n";

//sending last entry data back to the front-end
app.get("/getLastEntry", async (request, response) => {
  try {
    let i = projectData.length;
    console.log(`\nGET REQUEST FOR LAST ENTRY\nall recorded entries (${i}):`);
    let sendData = false;
    if (i !== 0) {
      sendData = projectData[i - 1];
    }
    //debug check for all entries
    projectData.forEach((x) => {
      console.log(x);
    });
    console.log("-----");
    console.log(x, JSON.stringify(sendData), x);
    response.send(sendData);
  } catch (error) {
    console.error(error);
    response.send(`failed! ${error.message}`);
  }
});

app.post("/aylienPOST", async (request, response) => {
  let req = await request.body;
  console.log(`----\nNew Entry Recieved\n`);
  // console.log(req);
  const x = await getAylienAnalysis(req);
  response.send("success!");
});

console.log(`Your API KEY is ${process.env.API_KEY}`);
console.log(`Your APP ID key is ${process.env.API_ID}`);

let t =
  "https://www.woodsbagot.com/news/woods-bagots-facade-automation-workflow-named-a-finalist-in-fast-companys-2019-innovation-by-design-awards/";

// getAylienAnalysis({ urlTest: "", textTest: "Hello, how are you my friend, i love you!!" });

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
  // console.log("logging the data input:\n-----\n", data);
  let analysisResult = null;
  aylien.combined(data, async (err, result) => {
    if (err === null) {
      analysisResult = await result;
      projectData.push(analysisResult);
      // console.log("\n-----\nlogging the results:\n-----\n", analysisResult);
    } else {
      console.log(err);
    }
  });
}


