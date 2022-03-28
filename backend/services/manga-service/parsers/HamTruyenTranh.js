const { fetchAndLoad } = require("../../scraping-service");

const URLRegex = /^https?:\/\/(www\.)?hamtruyentranh\.com\/truyen-tranh\/.+$/;

async function parseChapters($) {
  const rows = $("#chaps td:first-child a");

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
    name: $("h1").text(),
    link: url,
    image: "http://www.hamtruyentranh.com/" + $(".img-detail-cover img").attr("src"),
    isCompleted: false,
    chapters: await parseChapters($),
  };
}

module.exports = {
  active: false,
  lang: "vi",
  site: "HamTruyenTranh",
  homepage: "https://hamtruyentranh.com/",
  URLRegex,
  parseManga,
  parseChapters,
};
