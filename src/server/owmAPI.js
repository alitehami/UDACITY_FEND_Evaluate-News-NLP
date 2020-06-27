const owmAPI =
  "http://api.openweathermap.org/data/2.5/weather?zip=3000,AU&units=metric&appid=33831b5edaf31cdc9378937ba7166f6d";

const fetch = require("node-fetch");

async function getOWM() {
  const getData = await fetch(owmAPI);
  const weather = await getData.json();
  return weather;
}


module.exports = getOWM;