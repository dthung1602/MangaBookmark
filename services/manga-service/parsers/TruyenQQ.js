const { fetch } = require("./utils");

const URLRegex = /^https?:\/\/truyenqq\.com\/truyen-tranh\/.+$/;

async function parseChapters($) {
  const rows = $(".works-chapter-list a");

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
  const $ = await fetch(url);

  return {
    name: $("h1").text(),
    link: $('meta[property="og:url"]').attr("content"),
    image: $(".block01 .left img")[0].attribs.src,
    isCompleted: $(".block01 .txt").text().includes("Hoàn Thành"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  source: "TruyenQQ",
  URLRegex,
  parseManga,
  parseChapters,
};
