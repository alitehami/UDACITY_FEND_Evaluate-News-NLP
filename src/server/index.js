const dotenv = require("dotenv");
dotenv.config();

const path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
const owmAPIResponse = require("./owmAPI.js");
const bodyParser = require("body-parser");
const cors = require("cors");

// Require the Aylien npm package
const aylien = require("aylien_textapi");

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

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log("Example app listening on port 8081!");
});

console.log(`Your API KEY is ${process.env.API_KEY}`);
console.log(`Your APP ID key is ${process.env.API_ID}`);
