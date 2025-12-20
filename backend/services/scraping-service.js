import got from "got";
import * as tunnel from "tunnel";
import { load as cheerioLoad } from "cheerio";
import lodash from "lodash";
import { PROXY_HOST, PROXY_PORT, PROXY_ENABLED, BASE_URL } from "../config.js";
import { getLogger } from "./log-service.js";

const { startCase } = lodash;

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
        http: tunnel.httpOverHttp({ proxy: { host: PROXY_HOST, port: PROXY_PORT } }),
      },
    }
  : {};

if (PROXY_ENABLED) {
  getLogger("scraping-service").info(`Use proxy: ${PROXY_HOST}:${PROXY_PORT}`);
}

async function fetch(url, headers = {}, option = {}, useProxy = false) {
  return got(url, {
    headers: {
      ...getDefaultHeaders(),
      ...headers,
    },
    ...(useProxy ? proxyConfig : {}),
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
  return cheerioLoad(response.body);
}

async function fetchAndLoad(url, headers = {}, option = {}, raiseOnHostChanged = false, useProxy = false) {
  const response = await fetch(url, headers, option, useProxy);
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
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/117.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Safari/605.1.15",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/117.0",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/118.0",
  "Mozilla/5.0 (Windows NT 10.0; rv:109.0) Gecko/20100101 Firefox/117.0",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 Edg/116.0.1938.69",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 OPR/102.0.0.0",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 OPR/101.0.0.0",
];

function getRandomUserAgent() {
  return UAs[Math.floor(Math.random() * UAs.length)];
}

export {
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
export default {
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
