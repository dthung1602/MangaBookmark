const { fetchAndLoad } = require("./utils");

const URLRegex = /^https?:\/\/mangafast\.net\/read\/.+/;

async function parseChapters($) {
  const rows = $(".lsch .jds a");

  const chapters = [];
  for (let i = 0; i < rows.length; i++) {
    chapters.push({
      name: rows[i].attribs.title,
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
    image: $("#Thumbnail").attr("data-src"),
    isCompleted: $(".inftable").text().includes("StatusCompleted"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  language: "en",
  site: "MangaFast",
  homepage: "https://mangafast.net/",
  URLRegex,
  parseManga,
  parseChapters,
};
