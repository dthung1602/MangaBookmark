const normalizeDataSource = require("./utils").normalizeDataSource;

const URLRegex = /^https?:\/\/hamtruyen\.com\/.+\.html$/;

async function parseChapters(dataSource) {
  const $ = await normalizeDataSource(dataSource);

  const rows = $(".tenChapter a");

  const chapters = [];
  for (let i = 0; i < rows.length; i++) {
    chapters.push({
      name: rows[i].children[0].data,
      link: "https://hamtruyen.com" + rows[i].attribs.href,
    });
  }

  return chapters;
}

async function parseManga(dataSource) {
  const $ = await normalizeDataSource(dataSource);

  return {
    name: $('meta[property="og:title"]').attr("content"),
    link: $('meta[property="og:url"]').attr("content"),
    image: $("#content_truyen img").attr("src"),
    isCompleted: $(".icon_trangthai").parent().text().includes("Hoàn thành"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  URLRegex,
  parseManga,
  parseChapters,
};
