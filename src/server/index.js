const dotenv = require("dotenv").config();
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { url } = require("inspector");
const aylienAPI = require("aylien_textapi");
const dataCleaner = require("./dataCleaner.js");

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

app.use(express.static(__dirname + "/dist"));

// spin up the server
app.listen(port, function () {
  console.log(`the app is listening on http://localhost:${port}`);
});

app.get("/", function (req, res) {
  res.sendFile("dist/");
});

const x =
  "\n---------------------------------------------------------------------------------\n";

//the desired endpoints & formatting order of the aylien combined api call
const aylienEndPointsArray = [
  "sentiment",
  "language",
  "summarize",
  "classify",
  "entities",
  "hashtags",
  "concepts",
  "extract",
];

app.post("/aylienPOST", async (request, response) => {
  let req = request.body;
  console.log(`${x}\nNew Entry Recieved\n`);

  try {
    let data = {
      endpoint: aylienEndPointsArray,
    };
    // check for url or text input
    if (req.textTest) {
      data.text = req.textTest;
    } else {
      data.url = req.urlTest;
    }
    console.log("logging the data input:\n-----\n", data);
    aylien.combined(data, async (err, result) => {
      if (err === null) {
        let analysisResult = await result;
        projectData.push(analysisResult);
        console.log("\n-----\nlogging the results:\n-----\n", analysisResult);
        response.send(getAllCleanData(analysisResult));
      } else {
        console.log(".......AN ERROR HAS OCCURRED.......");
        console.log(err);
        response.send({
          dataArray: [
            [
              `<h2 style="text-align: center;">.......AN ERROR HAS OCCURRED.......<h2><br>${err}`,
            ],
          ],
        });
        return err;
      }
    });
  } catch (err) {
    console.log("failed aylien call function...");
    console.error(err);
    response.send(`error occured:\n${err}`);
  }
});

//sending last entry data back to the front-end
app.get("/getLastEntry", async (request, response) => {
  try {
    let i = projectData.length;
    console.log(`\nGET REQUEST FOR LAST ENTRY\nall recorded entries (${i}):`);
    let sendData = false;
    if (i !== 0) {
      sendData = projectData[i - 1];
    }
    console.log("-----");
    console.log(x, JSON.stringify(sendData), x);
    if (sendData) {
      // response.send(dataCleaner(sendData, "sentiment"));
      response.send(JSON.stringify(getAllCleanData(sendData)));
    } else {
      response.send({
        dataArray: [
          [`<h2 style="text-align: center;">.......NO RECORDS YET.......<h2>`],
        ],
      });
    }
  } catch (error) {
    console.error(error);
    response.send({
      dataArray: [
        `<h2 style="text-align: center;">.......AN ERROR HAS OCCURRED.......<h2><br>${error}`,
      ],
    });
  }
});

const testResult = {
  text: "ali",
  results: [
    {
      endpoint: "extract",
      result: {
        author: "",
        image: "",
        tags: [],
        article: "ali",
        videos: [],
        title: "",
        publishDate: "",
        feeds: [],
      },
    },
    {
      endpoint: "language",
      result: { lang: "it", confidence: 0.9999922738613526 },
    },
    { endpoint: "entities", result: { language: "it", entities: {} } },
    {
      endpoint: "concepts",
      result: {
        language: "it",
        concepts: {
          "http://it.dbpedia.org/resource/Ala_degli_insetti": {
            surfaceForms: [
              { string: "ali", score: 0.47585994005203247, offset: 0 },
            ],
            types: [],
            support: 1346,
          },
        },
      },
    },
    {
      endpoint: "classify",
      result: {
        language: "en",
        categories: [
          {
            label: "religious festival or holiday - easter",
            code: "12014002",
            confidence: 0.87,
          },
        ],
      },
    },
    {
      endpoint: "hashtags",
      result: { language: "it", hashtags: ["#AlaDegliInsetti"] },
    },
    {
      endpoint: "sentiment",
      result: {
        polarity: "positive",
        subjectivity: "unknown",
        polarity_confidence: 0.6446927785873413,
        subjectivity_confidence: 0,
      },
    },
    { endpoint: "summarize", result: { sentences: [] } },
  ],
};

//get a formatted HTML text for all the endpoints
const getAllCleanData = (testResult) => {
  console.log("------------", "\nprocessing the text...\n");
  let out = [];
  [...aylienEndPointsArray, "raw"].forEach((e) =>
    out.push(dataCleaner(testResult, e))
  );
  // console.log(out);
  console.log(x);
  return { dataArray: out };
};
