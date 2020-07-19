const normalizeDataSource = require("./utils").normalizeDataSource;

const URLRegex = /^https?:\/\/thichtruyentranh\.com\/.+\/[0-9]+\.html$/;

async function parseChapters(dataSource) {
  const $ = await normalizeDataSource(dataSource);

  const rows = $("#listChapterBlock a");

  const chapters = [];
  for (let i = 1; i < rows.length; i++) {
    chapters.push({
      name: rows[i].children[0].data,
      link: "https://thichtruyentranh.com" + rows[i].attribs.href,
    });
  }

  return chapters.reverse();
}

async function parseManga(dataSource) {
  const $ = await normalizeDataSource(dataSource);

  return {
    name: $("h1")[1].children[0].data,
    link: $('meta[property="og:url"]').attr("content"),
    image: $(".divthum2 img").attr("src"),
    isCompleted: $(".ullist_item").text().includes("FULL"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  source: "ThichTruyenTranh",
  URLRegex,
  parseManga,
  parseChapters,
};