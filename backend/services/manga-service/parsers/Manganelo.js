const { fetchAndLoad } = require("./utils");

const URLRegex = /^https?:\/\/(chap\.|m\.)?manganelo\.com\/manga.+$/;

async function parseChapters($) {
  const rows = $(".panel-story-chapter-list a");

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
    image: $(".info-image img").attr("src"),
    isCompleted: $(".story-info-right").text().includes("Completed"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  language: "en",
  site: "Manganelo",
  homepage: "https://manganelo.com/",
  URLRegex,
  parseManga,
  parseChapters,
};
