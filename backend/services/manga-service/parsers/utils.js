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

function extractTagsFromNode(tagContainerNode) {
  return tagContainerNode.children
    .filter((node) => node.name === "a")
    .map((node) => node.children[0].data.trim().toLowerCase())
    .filter(Boolean);
}

function extractAuthorsFromNode(authorContainerNode) {
  return authorContainerNode.children
    .filter((node) => node.name === "a")
    .map((node) => startCase(node.children[0].data))
    .filter(Boolean);
}

function cleanText(text, headerToRemove) {
  text = text.trim();
  if (headerToRemove && text.startsWith(headerToRemove)) {
    text = text.slice(headerToRemove.length).trim();
  }
  return text;
}

function extractTagsFromText(text, separator = ";", headerToRemove = null) {
  text = cleanText(text, headerToRemove);
  return text
    .split(separator)
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean);
}

function extractAuthorsFromText(text, separator = ";", headerToRemove = null) {
  text = cleanText(text, headerToRemove);
  return text.split(separator).map(startCase).filter(Boolean);
}

function extractNamesFromText(text, separator = ";", headerToRemove = null) {
  text = cleanText(text, headerToRemove);
  return text
    .split(separator)
    .map((tag) => tag.trim())
    .filter(Boolean);
}

module.exports = {
  fetch,
  fetchAndLoad,
  getDefaultHeaders,
  removeMangaNamePrefix,
  wait,
  extractAuthorsFromNode,
  extractTagsFromNode,
  extractAuthorsFromText,
  extractTagsFromText,
  extractNamesFromText,
  cleanText,
};
