const { fetchAndLoad } = require("./utils");

const URLRegex = /^https?:\/\/mangafast\.org\/read\/.+/;
const BaseURL = "https://mangafast.org";

async function parseChapters($) {
  const rows = $("a.chapter-link");

  const chapters = [];
  for (let i = 0; i < rows.length; i++) {
    chapters.push({
      name: rows[i].attribs.title,
      link: BaseURL + rows[i].attribs.href,
    });
  }

  return chapters;
}

async function parseManga(url) {
  const $ = await fetchAndLoad(url);

  return {
    name: $("h1").text(),
    link: url,
    image: $("#Thumbnail").attr("data-src"),
    isCompleted: $(".inftable").text().includes("completed"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  active: true,
  lang: "en",
  site: "MangaFast",
  homepage: "https://mangafast.net/",
  URLRegex,
  parseManga,
  parseChapters,
};
