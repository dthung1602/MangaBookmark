const fs = require("fs");

let parserNames = [];
fs.readdir(__dirname, (err, files) => {
  if (err) {
    throw err;
  }
  const otherFiles = ["utils", "index"];
  parserNames = files.map((file) => file.slice(0, file.length - 3)).filter((file) => otherFiles.indexOf(file) === -1);
});

const parsers = parserNames.map(function (p) {
  return require("./" + p);
});

const parserRegexMapping = {};
for (let i = 0; i < parserNames.length; i++) {
  parserRegexMapping[parserNames[i]] = parsers[i].URLRegex;
}

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
  parserNames,
  parserRegexMapping,
  getParser,
};
