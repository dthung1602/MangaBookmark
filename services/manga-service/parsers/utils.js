const rq = require("request-promise");
const cheerio = require("cheerio");

const { USER_AGENT } = require("../../../config");

async function loadData(dataSource) {
  return cheerio.load(
    await rq({
      uri: dataSource,
      headers: {
        "User-Agent": USER_AGENT,
      },
    }),
  );
}

function normalizeDataSource(dataSource) {
  return typeof dataSource === "string" && dataSource.trim().startsWith("http") ? loadData(dataSource) : dataSource;
}

module.exports = { normalizeDataSource };
