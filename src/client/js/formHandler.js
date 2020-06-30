//red
/* Function to POST data */
const postData = async (url = "", data = {}) => {
  console.log(data);
  try {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const content = await response.json();
    return content;
  } catch (error) {
    console.log(error);
  }
};
//

//yellow
/* Function to GET data */
const getData = async (url = "") => {
  const response = await fetch(url);
  try {
    const collect = await response.json();
    return collect;
  } catch (error) {
    console.log(error);
  }
};
//

function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById("testText").value;
  let dataRequest = {
    textTest: "",
    urlTest: "",
  };
  if (formText) {
    let checkType = Client.checkText_isURL(formText);

    if (checkType) {
      dataRequest.urlTest = formText;
    } else {
      dataRequest.textTest = formText;
    }
    console.log("::: Form Submitted :::");
    postData("http://localhost:8081/aylienPOST", dataRequest).then((r) => {
      console.log(r);
    });

    
    fetch("http://localhost:8081/test")
      .then((res) => {
        return res;
      })
      .then(function (data) {
        document.getElementById("results").innerHTML = data.message;
      });
  } else {
    event.target.value = "Give me something to think about!!";
  }
}

export { handleSubmit };
