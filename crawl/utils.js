const rq = require("request-promise");
const cheerio = require("cheerio");

async function loadData(dataSource) {
  return cheerio.load(await rq(dataSource));
}

function normalizeDataSource(dataSource) {
  return typeof dataSource === "string" && dataSource.trim().startsWith("http")
    ? loadData(dataSource)
    : dataSource;
}

module.exports = { normalizeDataSource };
