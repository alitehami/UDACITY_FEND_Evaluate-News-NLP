async function melbourneWeather() {
  const getData = await fetch('http://127.0.0.1:8081/owmMelbourne');
  const weather = await getData.json();
  document.getElementById("results").innerHTML = JSON.stringify(weather);
}

export { melbourneWeather };
