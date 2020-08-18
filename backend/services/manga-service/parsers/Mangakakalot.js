const { fetchAndLoad } = require("./utils");

const URLRegex = /^https?:\/\/mangakakalot\.com\/(read-|manga\/).+$/;

async function parseChapters($) {
  const rows = $(".chapter-list a");

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
    image: $(".manga-info-pic img").attr("src").trim(),
    isCompleted: $(".manga-info-text li")[2].children[0].data === "Status : Completed",
    chapters: await parseChapters($),
  };
}

module.exports = {
  site: "Mangakakalot",
  homepage: "https://mangakakalot.com/",
  URLRegex,
  parseManga,
  parseChapters,
};
