const { getLogger, SEARCH_MANGA_FAILED } = require("../log-service");
const searchOneSite = require("./search-one-site");

const logger = getLogger("search-multiple-scanlation-sites");

module.exports = async function (sites, term, topN = 3) {
  const results = await Promise.allSettled(sites.map((site) => searchOneSite(site, term, topN)));

  let successes = [];
  results.forEach((result, idx) => {
    if (result.status === "fulfilled") {
      successes = successes.concat(result.value);
    } else {
      logger.error(SEARCH_MANGA_FAILED, {
        error: result.reason.toString(),
        site: sites[idx],
        term,
        topN,
      });
    }
  });

  return successes;
};
