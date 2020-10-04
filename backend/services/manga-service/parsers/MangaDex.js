const got = require("got");
const cheerio = require("cheerio");

const { fetchAndLoad, getDefaultHeaders } = require("./utils");

const URLRegex = /^https?:\/\/mangadex\.org\/title\/[0-9]+\/.+$/;
const chapterRegex = /^(.*\/)chapters\/([0-9]+)\/$/;
const baseURL = "https://mangadex.org";
const maxMangaPerPage = 100;

function getChapters(response) {
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

async function parseChapters(url) {
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

  return got.paginate({
    url: url + "chapters/1/",
    headers: getDefaultHeaders(),
    pagination: {
      transform: getChapters,
      paginate: (response, allItems, currentItems) => {
        if (currentItems.length < maxMangaPerPage) {
          return false;
        }
        const prevURL = response.request.options.url;
        const match = prevURL.match(chapterRegex);
        const nextChap = Number(match[2]) + 1;
        return {
          url: url + `chapters/${nextChap}/`,
        };
      },
    },
  });
}

async function parseManga(url) {
  const $ = await fetchAndLoad(url);

  return {
    name: $("#content .card-header .mx-1").text().trim(),
    link: url,
    image: $("#content img")[0].attribs.src,
    isCompleted: $("#content .m-0:nth-child(9)").text().includes("Completed"),
    chapters: await parseChapters(url),
  };
}

module.exports = {
  site: "MangaDex",
  homepage: "https://mangadex.org/",
  URLRegex,
  parseManga,
  parseChapters,
};
