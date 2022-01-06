const fs = require("fs");

const excludedFiles = new Set(["utils", "index"]);

const searchers = {};

fs.readdirSync(__dirname)
  .map((file) => file.replace(".js", ""))
  .filter((file) => !excludedFiles.has(file))
  .forEach((file) => {
    const searcherModule = require("./" + file);
    searchers[searcherModule.site] = searcherModule;
  });

const supportedSites = Object.keys(searchers);

function getSearcher(site) {
  const searcher = searchers[site];
  if (searcher) {
    return searcher;
  }
  throw new Error("Unsupported searching for site " + site);
}

module.exports = { getSearcher, supportedSites };
