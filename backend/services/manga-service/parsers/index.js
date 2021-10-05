const fs = require("fs");
const { isString } = require("lodash");

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
    supportedSites.push({
      name: file,
      homepage: parserModule.homepage,
      lang: parserModule.lang,
      active: parserModule.active,
    });
    availableTags = availableTags.concat(parserModule.availableTags);
    parsers.push(parserModule);
    parserRegexMapping[file] = parserModule.URLRegex;
  });

supportedSites = supportedSites.sort((a, b) => a.name.localeCompare(b.name));
availableTags = Array.from(new Set(availableTags.filter(isString).map((t) => t.trim().toLowerCase())))
  .filter(Boolean)
  .sort((a, b) => a.localeCompare(b));

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

function getSiteByName(name) {
  return supportedSites.find((site) => site.name === name);
}

module.exports = {
  parsers,
  supportedSites,
  availableTags,
  parserRegexMapping,
  getParser,
  getSiteByName,
};
