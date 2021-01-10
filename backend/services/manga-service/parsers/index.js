const fs = require("fs");

const parsers = [];
const parserRegexMapping = {};
const supportedSites = [];

const excludedFiles = new Set(["utils", "index"]);

fs.readdirSync(__dirname)
  .map((file) => file.replace(".js", ""))
  .filter((file) => !excludedFiles.has(file))
  .forEach((file) => {
    const parserModule = require("./" + file);
    supportedSites.push({ name: file, homepage: parserModule.homepage, lang: parserModule.lang });
    parsers.push(parserModule);
    parserRegexMapping[file] = parserModule.URLRegex;
  });

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
  parserRegexMapping,
  getParser,
};
