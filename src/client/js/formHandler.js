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
    const content = await response;

    return content;
  } catch (error) {
    console.error(error);
  }
};
//

//#yellow
/* Function to GET data */
// const getData = async (url = "") => {
//   const response = await fetch(url);
//   try {
//     const collect = await response.json();
//     return collect;
//   } catch (error) {
//     console.error(error);
//   }
// };
//
const getData = async (url = "") => {
  const response = await fetch(url);
  try {
    const collect = response.json();
    return collect;
  } catch (error) {
    console.error(error);
  }
};
//#

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
      POSTandGET(dataRequest);
    })();

  } else {
    event.target.value = "Give me something to think about!!";
  }
}

export { handleSubmit };

// async function POSTandGET(dataRequest) {
//   let post = await postData("http://localhost:8081/aylienPOST", dataRequest);
//   let get = await getData("http://localhost:8081/getLastEntry");
//   console.log(get);
//   document.getElementById("results").innerHTML = get.dataArray[0];
// }

// async function POSTandGET(dataRequest) {
//   let post = await postData("http://localhost:8081/aylienPOST", dataRequest);
//   // await sleep(1000);
//   let get = await getData("http://localhost:8081/getLastEntry");
//   Promise.all([post, get]).then((values) => {
//     console.log("These are the chained promises:\n",values[0]);
//     const getR = values[1];
//     console.log(getR);
//     document.getElementById("results").innerHTML = getR.dataArray[0];
//   });
// }

async function POSTandGET(dataRequest) {
  await postData("http://localhost:8081/aylienPOST", dataRequest)
    .then(async (x) => {
      sleep(3000);
      const t = await getData("http://localhost:8081/getLastEntry");
      return t;
    })
    .then((get) => {
      console.log(get);
      document.getElementById("results").innerHTML = get.dataArray[0];
    });
}

// these sleep() functions are from other developers on stackoverflow.
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    console.log(i);
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }