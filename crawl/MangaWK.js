const normalizeDataSource = require("./utils").normalizeDataSource;

const URLRegex = /^https?:\/\/(read\.)?mangawk\.com\/read-.+$/;

async function parseChapters(dataSource) {
  const $ = await normalizeDataSource(dataSource);

  const rows = $(".chapter-name");

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
    image: $(".info-image img").attr("src"),
    isCompleted: $(".story-info-right").text().includes("Completed"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  source: "MangaWK",
  URLRegex,
  parseManga,
  parseChapters,
};
