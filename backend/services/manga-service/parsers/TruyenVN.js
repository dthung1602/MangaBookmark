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
    link: url,
    image: $(".comic-info img.lazy-load").attr("data-src"),
    isCompleted: $(".meta-data").text().includes("Hoàn Thành"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  active: true,
  lang: "vi",
  site: "TruyenVN",
  homepage: "https://truyenvn.com/",
  URLRegex,
  parseManga,
  parseChapters,
};
