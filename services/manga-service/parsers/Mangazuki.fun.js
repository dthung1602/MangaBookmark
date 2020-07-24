const { fetchAndLoad } = require("./utils");
const { parseChapters } = require("./Mangakakalot");

const URLRegex = /^https?:\/\/mangazuki\.fun\/manga\/.+$/;

async function parseManga(url) {
  const $ = await fetchAndLoad(url);

  return {
    name: $("h1").text().trim(),
    link: $('meta[property="og:url"]').attr("content").trim(),
    image: "http:" + $(".manga-info-pic img").attr("src").trim(),
    isCompleted: $(".manga-info-text").text().includes("Completed"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  source: "Mangazuki.fun",
  URLRegex,
  parseManga,
  parseChapters,
};
