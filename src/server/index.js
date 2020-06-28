const dotenv = require("dotenv").config();
// dotenv.config();

// Require the Aylien npm package
const aylienAPI = require("aylien_textapi");
const { url } = require("inspector");
const aylien = new aylienAPI({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY,
});
const path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
const owmAPIResponse = require("./owmAPI.js");
const bodyParser = require("body-parser");
const cors = require("cors");


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

console.log(JSON.stringify(mockAPIResponse));

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

app.get("/test", function (req, res) {
  res.json(mockAPIResponse);
});

app.get("/owmMelbourne", (request, response) => {
  owmAPIResponse().then((x) => {
    console.log("GET owm melbourne recieved....");
    console.log(x);
    response.json(x);
  });
});

let port = process.env.PORT;

// designates what port the app will listen to for incoming requests
app.listen(port, function () {
  console.log(`Example app listening on http://localhost:${port}`);
});

console.log(`Your API KEY is ${process.env.API_KEY}`);
console.log(`Your APP ID key is ${process.env.API_ID}`);

let urlTest =
  "https://www.woodsbagot.com/news/woods-bagots-facade-automation-workflow-named-a-finalist-in-fast-companys-2019-innovation-by-design-awards/";
// "https://jamesclear.com/creativity"
// "https://jamesclear.com/creativity"
// 'http://techcrunch.com/2015/04/06/john-oliver-just-changed-the-surveillance-reform-debate'
/*
aylien.sentiment(
  {
    // text: "John is bad!",
    url: urlTest,
  },
  function (error, response) {
    if (error === null) {
      console.log(response);
    }
  }
);

aylien.hashtags(
  {
    url: urlTest,
  },
  function (error, response) {
    if (error === null) {
      console.log(response.hashtags);
    }
  }
);

aylien.summarize(
  {
    url: urlTest,
    sentences_number: 1,
   
  },
  function (error, response) {
    if (error === null) {
      response.sentences.forEach(function (s) {
        console.log(s);
      });
    }
  }
);


aylien.entities({
  url:urlTest,
}, function(error, response) {
  if (error === null) {
    Object.keys(response.entities).forEach(function(e) {
      console.log(e + ": " + response.entities[e].join(","));
    });
  }
});
*/


aylien.combined(
  {
    
    url: urlTest,
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
  },
  function (err, result) {
    if (err === null) {
      result.results.forEach(function (r) {
        console.log("\n--------\n", r.endpoint + ":");
        console.log(r.result, "\n--------\n");
      });
    } else {
      console.log(err);
    }
  }
);
