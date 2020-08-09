const { fetchAndLoad } = require("./utils");

const URLRegex = /^http:\/\/www\.hamtruyentranh\.net\/truyen\/.+$/;

async function parseChapters($) {
  const rows = $(".total-chapter .content a");

  const chapters = [];
  for (let i = 0; i < rows.length; i++) {
    chapters.push({
      name: rows[i].children[0].data,
      link: rows[i].attribs.href,
    });
  }

  return chapters;
}

async function parseManga(url) {
  const $ = await fetchAndLoad(url);

  return {
    name: $(".title-manga").text(),
    link: "http://www.hamtruyentranh.net/" + $(".path-cond a:last-child").attr("href"),
    image: "http://www.hamtruyentranh.net/" + $(".cover-detail img").attr("src"),
    isCompleted: $(".description-update").text().includes("Kết thúc"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  source: "HamTruyenTranh",
  URLRegex,
  parseManga,
  parseChapters,
};