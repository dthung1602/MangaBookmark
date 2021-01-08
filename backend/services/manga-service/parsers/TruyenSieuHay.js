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
    link: url,
    image: $(".info_pic img").attr("src"),
    isCompleted: $(".row-detail").text().includes("Đã hoàn thành"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  lang: "vi",
  site: "TruyenSieuHay",
  homepage: "https://truyensieuhay.com/",
  URLRegex,
  parseManga,
  parseChapters,
};
