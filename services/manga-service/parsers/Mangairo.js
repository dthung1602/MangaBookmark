const { fetch } = require("./utils");

const URLRegex = /^https?:\/\/m\.mangairo\.com\/story-.+$/;

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
  const $ = await fetch(url);

  return {
    name: $("h1").text(),
    link: $('meta[property="og:url"]').attr("content"),
    image: $(".avatar").attr("src"),
    isCompleted: $(".story_info_right").text().includes("Completed"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  source: "Mangairo",
  URLRegex,
  parseManga,
  parseChapters,
};
