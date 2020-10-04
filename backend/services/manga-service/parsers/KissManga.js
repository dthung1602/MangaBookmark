const { fetchAndLoad, removeMangaNamePrefix } = require("./utils");

const URLRegex = /^https?:\/\/kissmanga\.org\/manga\/.+$/;
const BaseURL = "https://kissmanga.org";

async function parseChapters($) {
  const rows = $(".listing a");

  const chapters = [];
  for (let i = 0; i < rows.length; i++) {
    chapters.push({
      name: removeMangaNamePrefix(rows[i].children[0].data),
      link: BaseURL + rows[i].attribs.href,
    });
  }

  return chapters;
}

async function parseManga(url) {
  const $ = await fetchAndLoad(url);

  return {
    name: $($("h2")[0]).text(),
    link: url,
    image: BaseURL + $(".cover_anime img").attr("src"),
    isCompleted: $(".item_static").text().includes("Completed"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  site: "KissManga",
  homepage: "https://kissmanga.org",
  URLRegex,
  parseManga,
  parseChapters,
};
