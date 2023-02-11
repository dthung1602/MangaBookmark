#!/usr/bin/env node

/**
 * Inline JS & CSS in the built index.html
 */
const fs = require("fs");
const cheerio = require("cheerio");
const indexHtmlFile = `${__dirname}/build/index.html`;

console.log("> Inlining CSS & JS to index.html");
const html = fs.readFileSync(indexHtmlFile).toString();
const $ = cheerio.load(html);

const getFileContentThenRemove = (href) => {
  const content = fs.readFileSync(`${__dirname}/build${href}`).toString();
  fs.unlinkSync(`${__dirname}/build${href}`);
  return content;
};

$("head link[rel='stylesheet']").each((i, e) => {
  const ele = $(e);
  const href = ele.attr("href");
  if (href.endsWith("chunk.css")) {
    console.log(` - Inlining ${href}`);
    let style = getFileContentThenRemove(href);
    style = style.replace("sourceMappingURL=", "sourceMappingURL=/static/css/");
    ele.replaceWith(`<style>${style}</style>`);
  }
});

$("body script[src]").each((i, e) => {
  const ele = $(e);
  const src = ele.attr("src");
  if (src.endsWith("chunk.js")) {
    console.log(` - Inlining ${src}`);
    let script = getFileContentThenRemove(src);
    script = script.replace("sourceMappingURL=", "sourceMappingURL=/static/js/");
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
  try {
    if (!dirName.endsWith("/")) {
      dirName += "/";
    }
    let files = fs.readdirSync(dirName).map((f) => dirName + f);
    if (extensions) {
      files = files.filter((f) => extensions.includes(f.split(".").pop()));
    }
    return files;
  } catch (e) {
    console.log(`- Skip ${dirName}`);
    return [];
  }
};

const filesToCompress = [
  ...getFileInDir(`${__dirname}/build/static/css`),
  ...getFileInDir(`${__dirname}/build/static/js`),
  ...getFileInDir(`${__dirname}/build`, ["json", "ico", "js", "html"]),
];

for (let file of filesToCompress) {
  console.log(` - Compressing ${file.split("/").pop()}`);
  const buffer = brotliCompressSync(fs.readFileSync(file), {
    params: {
      [BROTLI_PARAM_MODE]: BROTLI_MODE_TEXT,
      [BROTLI_PARAM_QUALITY]: BROTLI_MAX_QUALITY,
    },
  });
  fs.writeFileSync(file + ".br", buffer);
  // if (!file.includes("index.html")) {
  //   fs.unlinkSync(file);
  // }
}
