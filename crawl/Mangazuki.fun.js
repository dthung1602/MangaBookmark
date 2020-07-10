const normalizeDataSource = require("./utils").normalizeDataSource;
const { parseChapters } = require("./Mangakakalot");
const URLRegex = /^https?:\/\/mangazuki\.fun\/manga\/.+$/;

async function parseManga(dataSource) {
  const $ = await normalizeDataSource(dataSource);

  return {
    name: $("h1").text(),
    link: $('meta[property="og:url"]').attr("content"),
    image: "http:" + $(".manga-info-pic img").attr("src"),
    isCompleted: $(".manga-info-text").text().includes("Completed"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  source: "Mangazuki.fun",
  URLRegex,
  parseManga,
  parseChapters,
};
