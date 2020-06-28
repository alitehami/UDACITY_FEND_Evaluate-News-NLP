//url regex detection reference: https://www.regextester.com/96504
const regex_url_string = `(?:(?:https?|ftp):\\/\\/|\\b(?:[a-z\\d]+\\.))(?:(?:[^\\s()<>]+|\\((?:[^\\s()<>]+|(?:\\([^\\s()<>]+\\)))?\\))+(?:\\((?:[^\\s()<>]+|(?:\\(?:[^\\s()<>]+\\)))?\\)|[^\\s\`!()\\[\\]{};:'".,<>?«»“”‘’]))?`;

const regex_url = new RegExp(regex_url_string, "igm");

function checkText_isURL(text) {
  let regex = regex_url;
  let test_text = text.trim();
  let test_index = test_text.search(regex);
  let test_match = test_text.match(regex);
  console.log(test_text, test_index, test_match);

  if (test_index !== -1) {
    if (
      test_match.length === 1 &&
      test_index === 0 &&
      test_match[0] === test_text
    ) {
      console.log("This is a URL case");
      return true;
    } else {
      console.log("This is a Text case");
      return false;
    }
  } else {
    console.log("This is a Text case");
    return false;
  }
}

export { checkText_isURL };

/*
let url1 =
  " ali  d d d https://jamesclear.com/creativity https://jamesclear.com/creativity in  https://jamesclear.com/creativity";

let url2 = `ali tehami   

drrg
f
sef
ews
f
        ffff  fwf http://foo.com
http://goo.gl
https://foo.com
https://www.foo.com
wrfsrf
f
wref
ewf
ewfff  gvgbvregf 

https://www.foo.com/
https://www.foo.com/bar
http://goo.gl/1 http://goo.gl/2
foo (http://goo.gl/1) http://goo.gl/(2)
http://foo.com/. http://foo.com/! http://foo.com/,
This url does not have a protocol: goo.gl/1
http://firstround.com/review/thoughts-on-gender-and-radical-candor/?ct=t(How_Does_Your_Leadership_Team_Rate_12_3_2015)
https://google.com

https:google.com

www.cool.com.au

http://www.cool.com.au

http://www.cool.com.au/ersdfs

http://www.cool.com.au/ersdfs?dfd=dfgd@s=1

http://www.cool.com:81/index.html`;

checkText_isURL(url1);
checkText_isURL("www.xreal.io");

function checkForName() {
  console.log("NAME CHECKER.");
}
*/

