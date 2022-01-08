const { getSearcher } = require("./searchers");

module.exports = async function (site, term, topN = 3) {
  const searcher = getSearcher(site);
  return (await searcher.search(term, topN)).slice(0, topN);
};
