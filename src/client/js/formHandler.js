let t =
  "https://www.woodsbagot.com/news/woods-bagots-facade-automation-workflow-named-a-finalist-in-fast-companys-2019-innovation-by-design-awards/";

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
    // const content = await response.json();
    // return content;
  } catch (error) {
    console.error(error);
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
    console.error(error);
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
    //double fetch(), POST & GET requests.
    (async () => {
      const post = await postData(
        "http://localhost:8081/aylienPOST",
        dataRequest
      );
      const data = await getData("http://localhost:8081/getLastEntry");
      console.log(data);
      document.getElementById("results").innerHTML = data.dataArray[0];
    })();
  } else {
    event.target.value = "Give me something to think about!!";
  }
}

export { handleSubmit };
