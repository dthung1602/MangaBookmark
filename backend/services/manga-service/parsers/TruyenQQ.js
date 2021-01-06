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
    link: url,
    image: JSON.parse($('script[type="application/ld+json"]')[0].children[0].data).image.url.trim(),
    isCompleted: $(".block01 .txt").text().includes("Hoàn Thành"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  language: "vi",
  site: "TruyenQQ",
  homepage: "http://truyenqq.com/",
  URLRegex,
  parseManga,
  parseChapters,
};
