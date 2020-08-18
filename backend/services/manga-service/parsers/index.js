const fs = require("fs");

const supportedSites = [];
const parsers = [];
const parserRegexMapping = {};

fs.readdir(__dirname, (err, files) => {
  if (err) {
    throw err;
  }
  const otherFiles = ["utils", "index"];
  files
    .map((file) => file.slice(0, file.length - 3))
    .filter((file) => otherFiles.indexOf(file) === -1)
    .forEach((file) => {
      const parserModule = require("./" + file);
      supportedSites.push({ name: file, homepage: parserModule.homepage });
      parsers.push(parserModule);
      parserRegexMapping[file] = parserModule.URLRegex;
    });
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
