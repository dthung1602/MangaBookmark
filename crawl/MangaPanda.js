const normalizeDataSource = require("./utils").normalizeDataSource;

const URLRegex = /^https?:\/\/www\.mangapanda\.com\/.+$/;
const baseURL = "http://www.mangapanda.com";

async function parseChapters(dataSource) {
  const $ = await normalizeDataSource(dataSource);

  const rows = $("#listing a");

  const chapters = [];
  for (let i = 0; i < rows.length; i++) {
    chapters.push({
      name: rows[i].children[0].data,
      link: baseURL + rows[i].attribs.href,
    });
  }

  return chapters;
}

async function parseManga(dataSource) {
  const $ = await normalizeDataSource(dataSource);

  return {
    name: $(".aname").text(),
    link: dataSource,
    image: $("#mangaimg img").attr("src"),
    isCompleted: $("#mangaproperties table").text().includes("Completed"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  source: "MangaPanda",
  URLRegex,
  parseManga,
  parseChapters,
};
