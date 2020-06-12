const rq = require("request-promise");
const cheerio = require("cheerio");
const { USER_AGENT } = require("../config");

async function loadData(dataSource) {
  return cheerio.load(
    await rq({
      uri: dataSource,
      insecure: true, // to handle .net and .com
      rejectUnauthorized: false, // to handle .net and .com
      headers: {
        "User-Agent": USER_AGENT,
        "Accept-Language": "en",
      },
    }),
  );
}

function normalizeDataSource(dataSource) {
  return typeof dataSource === "string" && dataSource.trim().startsWith("http") ? loadData(dataSource) : dataSource;
}

module.exports = { normalizeDataSource };
