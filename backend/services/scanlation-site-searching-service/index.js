const { supportedSites, getSearcher } = require("./searchers");

module.exports = {
  searchOneSite: require("./searchOneSite"),
  searchMultipleSites: require("./searchMultipleSites"),
  supportedSites,
  getSearcher,
};
