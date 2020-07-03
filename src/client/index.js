import { checkText_isURL } from "./js/nameChecker";
import { handleSubmit } from "./js/formHandler";
import { handleGetLast } from "./js/formHandler";
import "./js/networkStatus";

import "./styles/resets.scss";
import "./styles/base.scss";
import "./styles/form.scss";
import "./styles/footer.scss";
import "./styles/header.scss";

export { handleSubmit, checkText_isURL, handleGetLast };

const dom_testTextArea = document.querySelector("#testText");
const dom_submitAnalysis = document.querySelector("form > input[type=submit]");

dom_testTextArea.addEventListener("input", () => {
  let check = checkText_isURL(dom_testTextArea.value);
  if (check) {
    dom_submitAnalysis.value = "Analyze this Link..";
  } else {
    dom_submitAnalysis.value = "Analyze this Text blob..";
  }
});