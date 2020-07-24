const got = require("got");
const cheerio = require("cheerio");

const { getRandomUserAgent } = require("../../user-agent-service");

function getDefaultHeaders() {
  return {
    "User-Agent": getRandomUserAgent(),
    "Accept-Language": "en",
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  };
}

async function fetch(url, cookie = "") {
  return got(url, {
    headers: {
      ...getDefaultHeaders(),
      Cookie: cookie,
    },
  });
}

async function fetchAndLoad(url, cookie = "") {
  const response = await fetch(url, cookie);
  return cheerio.load(response.body);
}

module.exports = { fetch, fetchAndLoad, getDefaultHeaders };
