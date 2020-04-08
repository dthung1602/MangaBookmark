const normalizeDataSource = require("./utils").normalizeDataSource;

const URLRegex = /^https?:\/\/doctruyentranh\.online\/[0-9]+\/.+$/;

async function parseChapters(dataSource) {
  const $ = await normalizeDataSource(dataSource);

  const rows = $(".chapter a");

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
    name: $(".title").text(),
    link: $('meta[property="og:url"]').attr("content"),
    image: $("#ContentPlaceHolder1_mImg_Comic").attr("src"),
    isCompleted: $(".gioithieu").text().includes("Hoàn Thành"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  URLRegex,
  parseManga,
  parseChapters,
};
