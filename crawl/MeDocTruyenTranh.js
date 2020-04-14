const normalizeDataSource = require("./utils").normalizeDataSource;

const URLRegex = /^https?:\/\/www\.medoctruyentranh\.net\/truyen-tranh\/.+-[0-9]+$/;

async function parseChapters(dataSource) {
  const $ = await normalizeDataSource(dataSource);

  const rows = $(".chapter_pages a");

  const chapters = [];
  for (let i = rows.length - 1; i >= 0; i--) {
    chapters.push({
      name: rows[i].attribs.alt,
      link: rows[i].attribs.href,
    });
  }

  return chapters;
}

async function parseManga(dataSource) {
  const $ = await normalizeDataSource(dataSource);

  return {
    name: $(".title").text(),
    link: $(".breadCrumbCon a:last-child").attr("href"),
    image: $(".detail_info img").attr("src"),
    isCompleted: $(".other_infos").text().includes("Đã kết thúc"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  source: "MeDocTruyenTranh",
  URLRegex,
  parseManga,
  parseChapters,
};
