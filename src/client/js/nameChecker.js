//url regex detection reference: https://www.regextester.com/96504
const regex_url_string = `(?:(?:https?|ftp):\\/\\/|\\b(?:[a-z\\d]+\\.))(?:(?:[^\\s()<>]+|\\((?:[^\\s()<>]+|(?:\\([^\\s()<>]+\\)))?\\))+(?:\\((?:[^\\s()<>]+|(?:\\(?:[^\\s()<>]+\\)))?\\)|[^\\s\`!()\\[\\]{};:'".,<>?«»“”‘’]))?`;

const regex_url = new RegExp(regex_url_string, "igm");

function checkText_isURL(text) {
  let regex = regex_url;
  let test_text = text.trim();
  let test_index = test_text.search(regex);
  let test_match = test_text.match(regex);
  // console.log(test_text, test_index, test_match);

  if (test_index !== -1) {
    if (
      test_match.length === 1 &&
      test_index === 0 &&
      test_match[0] === test_text
    ) {
      // console.log("This is a URL case");
      return true;
    } else {
      // console.log("This is a Text case");
      return false;
    }
  } else {
    // console.log("This is a Text case");
    return false;
  }
}

export { checkText_isURL };

