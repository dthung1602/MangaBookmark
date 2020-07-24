const { fetchAndLoad } = require("./utils");

const URLRegex = /^https?:\/\/truyenvn\.com\/.+$/;

async function parseChapters($) {
  const links = $("#chapterList a");
  const names = $("#chapterList span:first-child");

  const chapters = [];
  for (let i = 0; i < links.length; i++) {
    chapters.push({
      name: names[i].children[0].data,
      link: links[i].attribs.href,
    });
  }

  return chapters;
}

async function parseManga(url) {
  const $ = await fetchAndLoad(url);

  return {
    name: $(".info .name").text(),
    link: $('meta[property="og:url"]').attr("content"),
    image: $(".comic-info picture img").attr("data-src"),
    isCompleted: $(".meta-data").text().includes("Hoàn Thành"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  source: "TruyenVN",
  URLRegex,
  parseManga,
  parseChapters,
};
