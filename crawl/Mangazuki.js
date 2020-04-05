const normalizeDataSource = require("./utils").normalizeDataSource;

const URLRegex = /^https?:\/\/mangazuki\.me\/manga\/.+$/;

async function parseChapters(dataSource) {
  const $ = await normalizeDataSource(dataSource);

  const rows = $(".listing-chapters_wrap a");

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
    name: $("h3").text(),
    link: $('meta[property="og:url"]').attr("content"),
    image: $(".summary_image a img").attr("data-src"),
    isCompleted: $(".summary-content").text().includes("Completed"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  URLRegex,
  parseManga,
  parseChapters,
};
