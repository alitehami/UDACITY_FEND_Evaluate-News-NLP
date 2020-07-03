//a great handy tool to help navigating & generating the json response attribute paths
//https://jsonpathfinder.com/
//Cleaninig up the Aylien api response
function dataCleaner(json, endpointType = false) {
  if (!json) {
    return {};
  }
  let pass = false;
  if (!endpointType) {
    pass = true;
  }
  let raw = false;
  if (endpointType === "raw") {
    raw = true;
  }

  const data = json.results;
  const dataArray = [];
  let br = "<br><hr><br>";
  let countRaw = 0;
  data.forEach((d) => {
    if (raw && !(countRaw > 0)) {
      test = "raw";
      countRaw++;
    } else {
      raw = false;
    }

    if (endpointType === d.endpoint || pass || raw) {
      // console.log(endpointType)
      let format = null;
      let i = d.result;
      let test = d.endpoint;

      if (raw) {
        test = "raw";
      }

      let id = `id="${test}"`;

      switch (test) {
        case "sentiment":
          console.log(`endpoint is ${test}`);
          let perc =
            parseFloat(i.polarity_confidence) >= 0.5
              ? "is most likely"
              : "might be";
          format = `<p ${id}>The Tone of this text ${perc} ${i.polarity}${br}<p>`;
          //
          dataArray.push(format);
          break;

        case "extract":
          console.log(`endpoint is ${test}`);
          format = `<p ${id}>The Title is: <strong>${i.title}<strong><br>Published on: ${i.publishDate}<br>Author:${i.author}<br>Tags:${i.tags}<br><br>Extracted Text:<br><br>${i.article}${br}<p>`;
          //
          dataArray.push(format);
          break;

        case "summarize":
          console.log(`endpoint is ${test}`);
          let sum = "";
          i.sentences.forEach((s) => (sum += `${s}<br>`));
          format = `<p ${id}>Summary of the extracted text:<br><br>${sum}${br}<p>`;
          //
          dataArray.push(format);
          break;

        case "concepts":
          console.log(`endpoint is ${test}`);
          let keys = "";
          for (const k of Object.keys(i.concepts)) {
            keys += `<a href="${k}" target="_blank">${i.concepts[k].surfaceForms[0].string} | <a>`;
            // console.log(k);
          }
          format = `<p ${id}>Concepts Analyzed from the Text:<br>${keys}${br}<p>`;
          //
          dataArray.push(format);
          break;

        case "entities":
          console.log(`endpoint is ${test}`);
          const conc = (c) => {
            let sum = "";
            if (c) {
              c.forEach((s) => (sum += `${s}, `));
            }
            return sum;
          };

          format = `<p ${id}>Entities found in the text:<br><br>Organizations: ${conc(
            i.entities.organization
          )}<br><br>Locations: ${conc(
            i.entities.location
          )}<br><br>Keywords: ${conc(i.entities.keyword)}<br><br>Dates: ${conc(
            i.entities.date
          )}<br><br>Names & Individuals: ${conc(i.entities.person)}${br}<p>`;
          //
          dataArray.push(format);
          break;

        case "language":
          console.log(`endpoint is ${test}`);
          format = `<p ${id}>Language: ${i.lang}${br}<p>`;
          //
          dataArray.push(format);
          break;

        case "hashtags":
          console.log(`endpoint is ${test}`);
          let hashTags = "";
          i.hashtags.forEach(h => hashTags+=`${h} `);
          format = `<p ${id}>Hashtags:<br>${hashTags}${br}<p>`;
          //
          dataArray.push(format);
          break;

        case "classify":
          console.log(`endpoint is ${test}`);
          let labels = "";
          i.categories.forEach(l => labels+=`${l.label}, `);
          format = `<p ${id}>Classification: <br>${labels}${br}<p>`;
          //
          dataArray.push(format);
          break;

        case "raw":
          console.log(`endpoint is RAW DATA`);
          format = `<p ${id}>Below is the Raw Json Data, you can use the <a href="https://jsonpathfinder.com/" target="_blank">JSON Path Finder Web App<a> to dig through and display these raw data points:<hr>${JSON.stringify(
            json
          )}${br}<p>`;
          dataArray.push(format);
          break;

        default:
          false;
      }
    }
  });
  return dataArray;
}

module.exports = dataCleaner;
