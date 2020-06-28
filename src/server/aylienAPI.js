const dotenv = require("dotenv").config();
// dotenv.config();

// Require the Aylien npm package
const aylienAPI = require("aylien_textapi");
const { url } = require("inspector");
const aylien = new aylienAPI({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY,
});

const owmAPI =
  "http://api.openweathermap.org/data/2.5/weather?zip=3000,AU&units=metric&appid=33831b5edaf31cdc9378937ba7166f6d";

const fetch = require("node-fetch");

async function getOWM() {
  const getData = await fetch(owmAPI);
  const weather = await getData.json();
  return weather;
}


module.exports = getOWM;




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
