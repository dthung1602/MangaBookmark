const normalizeDataSource = require("./utils").normalizeDataSource;

const URLRegex = /^https?:\/\/saytruyen\.com\/truyen-.+$/;

async function parseChapters(dataSource) {
  const $ = await normalizeDataSource(dataSource);

  const rows = $(".chapter");

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
  const lastBreadcrumb = $(".breadcrumb li:last-child a");

  return {
    name: lastBreadcrumb.text().trim(),
    link: lastBreadcrumb.attr("href"),
    image: $('meta[property="og:image"]').attr("content"),
    isCompleted: $(".manga-info").text().includes("Hoàn thành"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  source: "SayTruyen",
  URLRegex,
  parseManga,
  parseChapters,
};
