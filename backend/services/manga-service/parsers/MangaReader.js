const { fetchAndLoad } = require("./utils");

const URLRegex = /^https?:\/\/www\.mangareader\.net\/.+$/;
const baseURL = "http://www.mangareader.net";

async function parseChapters($) {
  const rows = $("#listing a");

  const chapters = [];
  for (let i = 0; i < rows.length; i++) {
    chapters.push({
      name: rows[i].children[0].data,
      link: baseURL + rows[i].attribs.href,
    });
  }

  return chapters;
}

async function parseManga(url) {
  const $ = await fetchAndLoad(url);

  return {
    name: $(".aname").text(),
    link: url,
    image: $("#mangaimg img").attr("src"),
    isCompleted: $("#mangaproperties table").text().includes("Completed"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  lang: "en",
  site: "MangaReader",
  homepage: "https://www.mangareader.net/",
  URLRegex,
  parseManga,
  parseChapters,
};
