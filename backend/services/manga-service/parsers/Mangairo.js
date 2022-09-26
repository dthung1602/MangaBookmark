const { fetchAndLoad } = require("../../scraping-service");

const URLRegex = /^https?:\/\/chap\.mangairo\.com\/story-.+$/;

async function parseChapters($) {
  const rows = $("#chapter_list a");

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
    image: $(".avatar").attr("src"),
    isCompleted: $(".story_info_right").text().includes("Completed"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  active: true,
  lang: "en",
  site: "Mangairo",
  homepage: "https://w.mangairo.com/home",
  URLRegex,
  parseManga,
  parseChapters,
};
