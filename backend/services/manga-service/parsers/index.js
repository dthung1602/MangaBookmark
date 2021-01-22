const fs = require("fs");

const parsers = [];
const parserRegexMapping = {};
let supportedSites = [];
let availableTags = [];

const excludedFiles = new Set(["utils", "index"]);

fs.readdirSync(__dirname)
  .map((file) => file.replace(".js", ""))
  .filter((file) => !excludedFiles.has(file))
  .forEach((file) => {
    const parserModule = require("./" + file);
    supportedSites.push({ name: file, homepage: parserModule.homepage, lang: parserModule.lang });
    availableTags = availableTags.concat(parserModule.availableTags);
    parsers.push(parserModule);
    parserRegexMapping[file] = parserModule.URLRegex;
  });

supportedSites = supportedSites.sort();
availableTags = Array.from(new Set(availableTags)).filter(Boolean).sort();

function getParser(url) {
  if (!url) {
    return null;
  }
  for (let i = 0; i < parsers.length; i++) {
    if (url.match(parsers[i].URLRegex)) {
      return parsers[i];
    }
  }
  return null;
}

module.exports = {
  parsers,
  supportedSites,
  availableTags,
  parserRegexMapping,
  getParser,
};
