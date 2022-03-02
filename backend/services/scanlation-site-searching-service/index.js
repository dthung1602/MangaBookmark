const { supportedSites, getSearcher } = require("./searchers");

module.exports = {
  searchOneSite: require("./search-one-site"),
  searchMultipleSites: require("./search-multiple-sites"),
  supportedSites,
  getSearcher,
};
