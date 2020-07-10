const URLRegex = /^https?:\/\/(ww1\.)?mangakakalots\.com\/manga\/.+$/;
const baseURL = "https://ww1.mangakakalots.com";

const { normalizeDataSource } = require("./utils");

async function parseChapters(dataSource) {
  const $ = await normalizeDataSource(dataSource);

  const rows = $(".chapter-list a");

  const chapters = [];
  for (let i = 0; i < rows.length; i++) {
    chapters.push({
      name: rows[i].children[0].data.trim(),
      link: baseURL + rows[i].attribs.href.trim(),
    });
  }

  return chapters;
}

async function parseManga(dataSource) {
  const $ = await normalizeDataSource(dataSource);

  return {
    name: $("h1").text().trim(),
    link: baseURL + $('meta[property="og:url"]').attr("content").trim(),
    image: $(".manga-info-pic img").attr("src").trim(),
    isCompleted: $(".manga-info-text li")[2].children[0].data === "Status : Completed",
    chapters: await parseChapters($),
  };
}

module.exports = {
  source: "MangakakalotS",
  URLRegex,
  parseManga,
  parseChapters,
};
