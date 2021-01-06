const got = require("got");
const cheerio = require("cheerio");
const { chunk } = require("lodash");

const { fetchAndLoad, getDefaultHeaders, wait } = require("./utils");
const URLRegex = /^https?:\/\/mangadex\.org\/title\/[0-9]+\/.+$/;
const chapterRegex = /^(.*\/)chapters\/([0-9]+)\/$/;
const baseURL = "https://mangadex.org";

async function getChapters(responsePromise) {
  const response = await responsePromise;
  const $ = cheerio.load(response.body);
  const rows = $(".chapter-container a.text-truncate");
  const isEnglish = $(".chapter-container .flag").map((i, e) => {
    return e.attribs.class.includes("flag-gb");
  });

  const chapters = [];
  for (let i = 0; i < rows.length; i++) {
    if (isEnglish[i]) {
      chapters.push({
        name: rows[i].children[0].data,
        link: baseURL + rows[i].attribs.href,
      });
    }
  }

  return chapters;
}

async function parseChapters($, url) {
  // ensure / at the end of url
  url = url.trim();
  if (url[url.length - 1] !== "/") {
    url += "/";
  }

  // strip url to base url, i.e. without /chapters/x
  const match = url.match(chapterRegex);
  if (match) {
    url = match[1];
  }

  let totalChapterPage;
  const paginationNode = $(".pagination li:last-child a")[0];
  if (paginationNode) {
    const lastPageURLParts = paginationNode.attribs.href.split("/");
    totalChapterPage = parseInt(lastPageURLParts[lastPageURLParts.length - 2]);
  } else {
    totalChapterPage = 1;
  }

  const chunks = chunk([...Array(totalChapterPage).keys()], 3);
  let chapters = [];
  for (let chunk of chunks) {
    chapters.push(
      await Promise.all(
        chunk
          .map((currentPage) =>
            got({
              url: url + `chapters/${currentPage + 1}/`,
              headers: getDefaultHeaders(),
            }),
          )
          .map(getChapters),
      ),
    );
    await wait(500);
  }

  return chapters.flat().flat();
}

async function parseManga(url) {
  const $ = await fetchAndLoad(url);

  return {
    name: $("#content .card-header .mx-1").text().trim(),
    link: url,
    image: $("#content img")[0].attribs.src,
    isCompleted: false,
    chapters: await parseChapters($, url),
  };
}

module.exports = {
  language: "en",
  site: "MangaDex",
  homepage: "https://mangadex.org/",
  URLRegex,
  parseManga,
  parseChapters,
};
