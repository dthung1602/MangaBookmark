const { fetchAndLoad } = require("./utils");

const URLRegex = /^https?:\/\/truyenqq\.com\/truyen-tranh\/.+$/;

async function parseChapters($) {
  const rows = $(".works-chapter-list a");

  const chapters = [];
  for (let i = 0; i < rows.length; i++) {
    chapters.push({
      name: rows[i].children[0].data.trim(),
      link: rows[i].attribs.href.trim(),
    });
  }

  return chapters;
}

async function parseManga(url) {
  const $ = await fetchAndLoad(url);

  return {
    name: $("h1").text().trim(),
    link: $('meta[property="og:url"]').attr("content").trim(),
    image: $(".block01 .left img")[0].attribs.src.trim(),
    isCompleted: $(".block01 .txt").text().includes("Hoàn Thành"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  site: "TruyenQQ",
  homepage: "http://truyenqq.com/",
  URLRegex,
  parseManga,
  parseChapters,
};
