const dotenv = require("dotenv").config();
// dotenv.config();

const path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
const owmAPIResponse = require("./owmAPI.js");
const bodyParser = require("body-parser");
const cors = require("cors");

// Require the Aylien npm package
const aylienAPI = require("aylien_textapi");
const aylien = new aylienAPI({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY,
});

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

aylien.sentiment(
  {
    // text: "John is bad!",
    url: "https://jamesclear.com/creativity",
  },
  function (error, response) {
    if (error === null) {
      console.log(response);
    }
  }
);
