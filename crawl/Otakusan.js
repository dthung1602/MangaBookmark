const normalizeDataSource = require("./utils").normalizeDataSource;

const URLRegex = /^https?:\/\/otakusan\.net\/MangaDetail\/[0-9]+\/.+$/;

async function parseChapters(dataSource) {
  const $ = await normalizeDataSource(dataSource);

  const rows = $("table.mdi-table .read-chapter a");

  const chapters = [];
  for (let i = 0; i < rows.length; i++) {
    chapters.push({
      name: rows[i].attribs.title,
      link: "https://otakusan.net" + rows[i].attribs.href,
    });
  }

  return chapters;
}

async function parseManga(dataSource) {
  const $ = await normalizeDataSource(dataSource);

  return {
    name: $(".title").text().trim(),
    link: $('meta[property="og:url"]').attr("content"),
    image: $(".manga-top-img img").attr("src"),
    isCompleted: $(".manga-top .table-info").text().includes("Done"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  source: "Otakusan",
  URLRegex,
  parseManga,
  parseChapters,
};
