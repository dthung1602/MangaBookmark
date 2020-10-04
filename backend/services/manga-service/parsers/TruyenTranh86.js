const { fetchAndLoad } = require("./utils");

const URLRegex = /^https?:\/\/truyentranh86\.com\/.+$/;

async function parseChapters($) {
  const rows = $("#ChapList a");

  const chapters = [];
  for (let i = 0; i < rows.length; i++) {
    chapters.push({
      name: rows[i].children[1].children[0].data,
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
    image: $(".thumbnail")[0].attribs.src,
    isCompleted: $(".mangainfo").text().includes("Đã hoàn thành"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  site: "TruyenTranh86",
  homepage: "http://truyentranh86.com/",
  URLRegex,
  parseManga,
  parseChapters,
};
