const { fetchAndLoad } = require("./utils");

const URLRegex = /^https?:\/\/truyensieuhay\.com\/.+$/;

async function parseChapters($) {
  const rows = $("#chapter-list-flag a");

  const chapters = [];
  for (let i = 0; i < rows.length; i++) {
    chapters.push({
      name: rows[i].children[0].data,
      link: "https://truyensieuhay.com" + rows[i].attribs.href,
    });
  }

  return chapters;
}

async function parseManga(url) {
  const $ = await fetchAndLoad(url);

  return {
    name: $(".title h1").text(),
    link: $('meta[property="og:url"]').attr("content"),
    image: $(".info_pic img").attr("src"),
    isCompleted: $(".row-detail").text().includes("Đã hoàn thành"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  source: "TruyenSieuHay",
  URLRegex,
  parseManga,
  parseChapters,
};
