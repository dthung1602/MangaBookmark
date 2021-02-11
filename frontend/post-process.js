#!/usr/bin/env node

/**
 * Add /api/* to service worker blacklist and inject custom service worker code from service-worker.js
 *
 * Ref: https://stackoverflow.com/a/63344095/7342188
 *      https://stackoverflow.com/a/52841700/7342188
 */
const fs = require("fs");
const serviceWorkerFile = `${__dirname}/build/service-worker.js`;
const customServiceWorkerFile = `${__dirname}/build/custom-service-worker.js`;

console.log("> Rebuilding service worker");
let text = fs.readFileSync(serviceWorkerFile).toString();
const start = text.indexOf("blacklist: [");
const end = text.indexOf("\n", start) - 2;

console.log(" - Injecting blacklist");
const blackListRegex = [/^\/api/];
const blackListString = "," + blackListRegex.map((r) => r.toString()).join(",");
text = text.substring(0, end) + blackListString + text.substring(end);

console.log(" - Injecting custom service worker");
const customServiceWorkerText = fs.readFileSync(customServiceWorkerFile).toString();
text += "\n" + customServiceWorkerText;

fs.writeFileSync(serviceWorkerFile, text);
fs.unlinkSync(customServiceWorkerFile);

/**
 * Inline JS & CSS in the built index.html
 */
const cheerio = require("cheerio");
const indexHtmlFile = `${__dirname}/build/index.html`;

console.log("> Inlining CSS & JS to index.html");
const html = fs.readFileSync(indexHtmlFile).toString();
const $ = cheerio.load(html);

const getStaticFileContent = (href) => {
  const content = fs.readFileSync(`${__dirname}/build${href}`).toString();
  fs.unlinkSync(`${__dirname}/build${href}`);
  return content;
};

$("head link[rel='stylesheet']").each((i, e) => {
  const ele = $(e);
  const href = ele.attr("href");
  if (href.endsWith("chunk.css")) {
    console.log(` - Inlining ${href}`);
    const style = getStaticFileContent(href);
    ele.replaceWith(`<style>${style}</style>`);
  }
});

$("body script[src]").each((i, e) => {
  const ele = $(e);
  const src = ele.attr("src");
  if (src.endsWith("chunk.js")) {
    console.log(` - Inlining ${src}`);
    const script = getStaticFileContent(src);
    ele.replaceWith(`<script>${script}</script>`);
  }
});

fs.writeFileSync(indexHtmlFile, $.html());

/**
 * Pre-compressing static files
 */

const {
  brotliCompressSync,
  constants: { BROTLI_PARAM_MODE, BROTLI_MODE_TEXT, BROTLI_PARAM_QUALITY, BROTLI_MAX_QUALITY },
} = require("zlib");

console.log("> Pre-compressing static files with brotli");

const getFileInDir = (dirName, extensions = null) => {
  if (!dirName.endsWith("/")) {
    dirName += "/";
  }
  let files = fs.readdirSync(dirName).map((f) => dirName + f);
  if (extensions) {
    files = files.filter((f) => extensions.includes(f.split(".").pop()));
  }
  return files;
};

const filesToCompress = [
  ...getFileInDir(`${__dirname}/build/static/css`),
  ...getFileInDir(`${__dirname}/build/static/js`),
  ...getFileInDir(__dirname, ["json", "ico", "js", "html"]),
];

for (let file of filesToCompress) {
  console.log(` - Compressing ${file}`);
  const buffer = brotliCompressSync(fs.readFileSync(file), {
    params: {
      [BROTLI_PARAM_MODE]: BROTLI_MODE_TEXT,
      [BROTLI_PARAM_QUALITY]: BROTLI_MAX_QUALITY,
    },
  });
  fs.writeFileSync(file + ".br", buffer);
  if (!file.includes("index.html")) {
    fs.unlinkSync(file);
  }
}
