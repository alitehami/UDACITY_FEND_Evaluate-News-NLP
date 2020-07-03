import { checkText_isURL } from "../src/client/js/nameChecker.js";

let url1 =
  "ali.com  d d d https://jamesclear.com/creativity https://jamesclear.com/creativity in  https://jamesclear.com/creativity";

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

let url3 = "  google.com  ";
let url4 = "http://gs.co\n";

//true is URL case, false is Text case
describe("Testing the Network Status functionality", () => {
  test("Testing the handleSubmit() function", () => {
    expect(checkText_isURL(url1)).toBeFalsy();
    expect(checkText_isURL(url2)).toBeFalsy();
    expect(checkText_isURL(url3)).toBeTruthy();
    expect(checkText_isURL(url4)).toBeTruthy();
  });
});
