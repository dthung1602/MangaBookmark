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

async function fetch(url, headers = {}, cookie = "") {
  return got(url, {
    headers: {
      ...getDefaultHeaders(),
      ...headers,
      Cookie: cookie,
    },
  });
}

async function fetchAndLoad(url, headers = {}, cookie = "") {
  const response = await fetch(url, headers, cookie);
  return cheerio.load(response.body);
}

function removeMangaNamePrefix(chapterName) {
  return chapterName.split("-").slice(1).join("-").trim();
}

async function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}

module.exports = { fetch, fetchAndLoad, getDefaultHeaders, removeMangaNamePrefix, wait };
