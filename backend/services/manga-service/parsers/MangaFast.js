const { fetchAndLoad } = require("./utils");

const URLRegex = /^https?:\/\/mangafast\.net\/read\/.+/;

async function parseChapters($) {
  const rows = $(".chapter-link-w a");

  const chapters = [];
  for (let i = 0; i < rows.length; i++) {
    chapters.push({
      name: rows[i].attribs.title,
      link: rows[i].attribs.href,
    });
  }

  return chapters;
}

async function parseManga(url) {
  const $ = await fetchAndLoad(url);

  return {
    name: $("h1").text(),
    link: url,
    image: $("#article-info .ims img").attr("src"),
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
