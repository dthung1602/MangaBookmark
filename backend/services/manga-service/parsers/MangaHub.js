const { fetchAndLoad, removeMangaNamePrefix } = require("./utils");

const URLRegex = /^https?:\/\/mangahub\.io\/manga\/.+$/;

async function parseChapters($) {
  const links = $("._2U6DJ");
  const names = $("._2IG5P");

  const chapters = [];
  for (let i = 0; i < links.length; i++) {
    chapters.push({
      name: removeMangaNamePrefix($(names[i]).text()),
      link: links[i].attribs.href,
    });
  }

  return chapters;
}

async function parseManga(url) {
  const $ = await fetchAndLoad(url);

  return {
    name: $(".breadcrumb .active").text(),
    link: url,
    image: $("#mangadetail img").attr("src"),
    isCompleted: $("._3QCtP > div:nth-child(2)").text().includes("Completed"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  language: "en",
  site: "MangaHub",
  homepage: "https://mangahub.io",
  URLRegex,
  parseManga,
  parseChapters,
};
