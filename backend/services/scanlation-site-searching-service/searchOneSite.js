const { getSearcher } = require("./searchers");

module.exports = async function (site, term, topN = 3) {
  const searcher = getSearcher(site);
  return searcher.search(term, topN);
};
