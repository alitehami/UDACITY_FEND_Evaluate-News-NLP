function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById("testText").value;

  if (formText) {
    Client.checkText_isURL(formText);
    Client.melbourneWeather();

    console.log("::: Form Submitted :::");
    fetch("http://localhost:8081/test")
      .then((res) => {
        return res.json();
      })
      .then(function (data) {
        document.getElementById("results").innerHTML = data.message;
      });
  } else {
    event.target.value = "Give me something to think about!!";
  }
}

export { handleSubmit };
