const got = require("got");
const cheerio = require("cheerio");

const { getRandomUserAgent } = require("../../user-agent-service");

async function fetch(url) {
  const response = await got(url, {
    headers: {
      "User-Agent": getRandomUserAgent(),
      "Accept-Language": "en",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    },
  });
  return cheerio.load(response.body);
}

module.exports = { fetch };
