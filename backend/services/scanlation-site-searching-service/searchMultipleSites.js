const { flatten } = require("lodash");

const searchOneSite = require("./searchOneSite");

module.exports = async function (sites, term, topN = 3) {
  return flatten(await Promise.all(sites.map((site) => searchOneSite(site, term, topN))));
};
