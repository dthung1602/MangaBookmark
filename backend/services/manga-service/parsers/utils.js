const got = require("got");
const cheerio = require("cheerio");
const { startCase } = require("lodash");

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
  fetchAndLoad,
  getDefaultHeaders,
  removeMangaNamePrefix,
  wait,
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
};
