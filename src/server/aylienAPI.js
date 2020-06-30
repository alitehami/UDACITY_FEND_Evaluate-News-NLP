//the node-fetch api
// const fetch = require("node-fetch");

// Require the Aylien npm package
const aylienAPI = require("aylien_textapi");

const aylien = new aylienAPI({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY,
});

function getAylienAnalysis(req) {
  let data = {
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
  };
  // check for url or text input
  if (req.textTest) {
    data.text = req.textTest;
  } else {
    data.url = req.urlTest;
  }
  // console.log("logging the data input:\n-----\n", data);
  let analysisResult = null;
  aylien.combined(data, async (err, result) => {
    if (err === null) {
      analysisResult = await result;
      
    } else {
      console.log(err);
    }
    // console.log("\n-----\nlogging the results:\n-----\n", analysisResult);
    // return analysisResult;
  })
}

// module.exports = getAylienAnalysis;