const normalizeDataSource = require("./utils").normalizeDataSource;

const URLRegex = /^https?:\/\/mangakakalot\.com\/(read-|manga\/).+$/;

async function parseChapters(dataSource) {
  const $ = await normalizeDataSource(dataSource);

  const rows = $(".chapter-list a");

  const chapters = [];
  for (let i = 0; i < rows.length; i++) {
    chapters.push({
      name: rows[i].children[0].data,
      link: rows[i].attribs.href,
    });
  }

  return chapters;
}

async function parseManga(dataSource) {
  const $ = await normalizeDataSource(dataSource);

  return {
    name: $("h1").text(),
    link: $('meta[property="og:url"]').attr("content"),
    image: $(".manga-info-pic img").attr("src"),
    isCompleted: $(".manga-info-text li")[2].children[0].data === "Status : Completed",
    chapters: await parseChapters($),
  };
}

module.exports = {
  source: "Mangakakalot",
  URLRegex,
  parseManga,
  parseChapters,
};
