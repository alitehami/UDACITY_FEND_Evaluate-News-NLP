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
    console.log(content);
    return content;
  } catch (error) {
    console.error(error);
  }
};

//GET request
const getData = async (url = "") => {
  const response = await fetch(url);
  try {
    const collect = await response.json();
    return collect;
  } catch (error) {
    console.error(error);
  }
};

//loading html text:
const loading = `<h1 style="text-align: center; font-size:2em;"> >>>>> LOADING <<<<< <h1>`;

function handleSubmit(event) {
  event.preventDefault();
  const dom_container = document.getElementById("results");

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
    dom_container.innerHTML = loading;
    (async () => {
      const result = await postData(
        "/aylienPOST",
        dataRequest
      );
      console.log("results here\n", result.dataArray);
      let allResults = "";
      result.dataArray.forEach((d) => (allResults += d[0]));
      dom_container.innerHTML = allResults;
    })();
  } else {
    event.target.value = "Give me something to think about!!";
  }
}
function handleGetLast(event) {
  event.preventDefault();
  const dom_container = document.getElementById("results");
  dom_container.innerHTML = loading;
  console.log("::: LAST RESULT REQUEST :::");
  (async () => {
    const result = await getData("/getLastEntry");
    console.log("results here\n", result.dataArray);
    let allResults = "";
    result.dataArray.forEach((d) => (allResults += d[0]));
    dom_container.innerHTML = allResults;
  })();
}

export { handleSubmit, handleGetLast };
