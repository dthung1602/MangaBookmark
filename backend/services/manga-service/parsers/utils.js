const got = require("got");
const tunnel = require("tunnel");
const cheerio = require("cheerio");
const { startCase } = require("lodash");

const { PROXY_HOST, PROXY_PORT, PROXY_ENABLED } = require("../../../config");
const { getRandomUserAgent } = require("../../user-agent-service");

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
  return $(nodes)
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
    .map((node) => startCase($(node).text()))
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

function useImageProxy(url, mangaSite) {
  return "/api/image-proxy?" + new URLSearchParams({ url, mangaSite }).toString();
}

module.exports = {
  fetch,
  load,
  fetchAndLoad,
  getDefaultHeaders,
  removeMangaNamePrefix,
  wait,
  findNodeWithHeader,
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
  MangaSiteRedirectedException,
};
