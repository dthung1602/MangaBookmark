const got = require("got");
const tunnel = require("tunnel");
const cheerio = require("cheerio");
const { startCase } = require("lodash");

const { PROXY_HOST, PROXY_PORT, PROXY_ENABLED, BASE_URL } = require("../config");

function getDefaultHeaders() {
  return {
    "User-Agent": getRandomUserAgent(),
    "Accept-Language": "en",
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  };
}

const proxyConfig = PROXY_ENABLED
  ? {
      agent: {
        https: tunnel.httpsOverHttp({ proxy: { host: PROXY_HOST, port: PROXY_PORT } }),
        http: tunnel.httpOverHttp({ proxy: { host: PROXY_HOST, port: PROXY_PORT } }),
      },
    }
  : {};

async function fetch(url, headers = {}, option = {}) {
  return got(url, {
    headers: {
      ...getDefaultHeaders(),
      ...headers,
    },
    ...proxyConfig,
    ...option,
  });
}

function isSameHost(url1, url2) {
  return new URL(url1).host === new URL(url2).host;
}

class MangaSiteRedirectedException extends Error {
  constructor(newUrl) {
    super();
    this.newUrl = newUrl;
  }
}

function load(url, response, raiseOnHostChanged = false) {
  if (raiseOnHostChanged && !isSameHost(url, response.url)) {
    throw new MangaSiteRedirectedException(response.url);
  }
  return cheerio.load(response.body);
}

async function fetchAndLoad(url, headers = {}, option = {}, raiseOnHostChanged = false) {
  const response = await fetch(url, headers, option);
  const fs = require("fs");
  fs.writeFileSync("foo.html", response.body);
  return load(url, response, raiseOnHostChanged);
}

function removeMangaNamePrefix(chapterName) {
  return chapterName.split("-").slice(1).join("-").trim();
}

async function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}

function findNodeWithHeader($, nodes, text) {
  return filterNodeWithHeader($, $(nodes), text);
}

function filterNodeWithHeader($, nodes$, text) {
  return nodes$
    .toArray()
    .map($)
    .filter((node) => node.text().toLowerCase().includes(text.toLowerCase()))[0];
}

function findNodeWithHeaderAndExtractNameFromText($, nodes, header = null, separator = null) {
  const node = findNodeWithHeader($, nodes, header);
  if (node) {
    return extractNamesFromText(node.text(), separator, header);
  }
  return [];
}

function findNodeWithHeaderAndExtractAuthorFromText($, nodes, header = null, separator = null) {
  const node = findNodeWithHeader($, nodes, header);
  if (node) {
    return extractAuthorsFromText(node.text(), separator, header);
  }
  return [];
}

function findNodeWithHeaderAndExtractTagsFromText($, nodes, header = null, separator = null) {
  const node = findNodeWithHeader($, nodes, header);
  if (node) {
    return extractTagsFromText(node.text(), separator, header);
  }
  return [];
}

function extractTagsFromNode($, tagNodes) {
  return $(tagNodes)
    .toArray()
    .map((node) => $(node).text().trim().toLowerCase())
    .filter(Boolean);
}

function extractAuthorsFromNode($, authorNodes) {
  return $(authorNodes)
    .toArray()
    .map((node) => startCase($(node).text().trim()))
    .filter(Boolean);
}

function cleanText(text, headerToRemove) {
  text = text.trim();
  if (headerToRemove && text.startsWith(headerToRemove)) {
    text = text.slice(headerToRemove.length).trim();
  }
  return text;
}

/**
 * Guess the separator in string
 * If both , ; present, prefer the one with fewer appearance
 * Ex:  one, two three; ein, zwei drei -> separator is ;
 */
function guessSeparator(text) {
  const commaCount = text.split(",").length;
  const semiColonCount = text.split(";").length;
  if (commaCount === 1) {
    return ";";
  }
  if (semiColonCount === 1) {
    return ",";
  }
  return commaCount < semiColonCount ? "," : ";";
}

function extractTagsFromText(text, separator = ";", headerToRemove = null) {
  text = cleanText(text, headerToRemove);
  separator = separator === null ? guessSeparator(text) : separator;
  return text
    .split(separator)
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean);
}

function extractAuthorsFromText(text, separator = ";", headerToRemove = null) {
  text = cleanText(text, headerToRemove);
  separator = separator === null ? guessSeparator(text) : separator;
  return text.split(separator).map(startCase).filter(Boolean);
}

function extractNamesFromText(text, separator = ";", headerToRemove = null) {
  text = cleanText(text, headerToRemove);
  separator = separator === null ? guessSeparator(text) : separator;
  return text
    .split(separator)
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function useImageProxy(url, mangaSite, fullURL = false) {
  let imageUrl = "/api/image/proxy?" + new URLSearchParams({ url, mangaSite }).toString();
  if (fullURL) {
    imageUrl = BASE_URL + imageUrl;
  }
  return imageUrl;
}

const UAs = [
  "Mozilla/5.0 (Windows NT 4.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1500.55 Safari/537.36",
  "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.3319.102 Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.2 Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.14 (KHTML, like Gecko) Chrome/24.0.1292.0 Safari/537.14",
  "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.2117.157 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1664.3 Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.67 Safari/537.36",
  "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.16 Safari/537.36",
  "Mozilla/5.0 (X11; NetBSD) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.116 Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1467.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.47 Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1667.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2224.3 Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2225.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1944.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.93 Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.90 Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1623.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.2309.372 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.93 Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1667.0 Safari/537.36",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.137 Safari/4E423F",
  "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.60 Safari/537.17",
  "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.90 Safari/537.36",
  "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2224.3 Safari/537.36",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.517 Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.62 Safari/537.36",
  "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.2117.157 Safari/537.36",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.517 Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.14 (KHTML, like Gecko) Chrome/24.0.1292.0 Safari/537.14",
  "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.60 Safari/537.17",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.137 Safari/4E423F",
  "Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.93 Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.2 Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.62 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1664.3 Safari/537.36",
  "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.16 Safari/537.36",
];

function getRandomUserAgent() {
  return UAs[Math.floor(Math.random() * UAs.length)];
}

module.exports = {
  fetch,
  load,
  fetchAndLoad,
  getDefaultHeaders,
  removeMangaNamePrefix,
  wait,
  findNodeWithHeader,
  filterNodeWithHeader,
  findNodeWithHeaderAndExtractNameFromText,
  findNodeWithHeaderAndExtractAuthorFromText,
  findNodeWithHeaderAndExtractTagsFromText,
  extractAuthorsFromNode,
  extractTagsFromNode,
  extractAuthorsFromText,
  extractTagsFromText,
  extractNamesFromText,
  cleanText,
  useImageProxy,
  getRandomUserAgent,
  MangaSiteRedirectedException,
};
