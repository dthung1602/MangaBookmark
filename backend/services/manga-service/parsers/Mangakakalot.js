const { startCase } = require("lodash");

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

function parseAdditionalInfo($) {
  const mangaInfoText = $(".manga-info-text li");
  const description = $("#noidungm")[0].children[2].data.trim();
  const alternativeNames = $(".story-alternative")
    .text()
    .slice(13)
    .split(";")
    .map((x) => x.trim());
  const authors = mangaInfoText[1].children
    .filter((node) => node.name === "a")
    .map((node) => startCase(node.children[0].data));
  const tags = mangaInfoText[6].children
    .filter((node) => node.name === "a")
    .map((node) => node.children[0].data.trim().toLowerCase());
  return { description, alternativeNames, authors, tags };
}

async function parseManga(url) {
  const $ = await fetchAndLoad(url);

  return {
    name: $("h1").text().trim(),
    link: url,
    image: $(".manga-info-pic img").attr("src").trim(),
    isCompleted: $(".manga-info-text li")[2].children[0].data === "Status : Completed",
    chapters: await parseChapters($),
    ...parseAdditionalInfo($),
  };
}

module.exports = {
  lang: "en",
  site: "Mangakakalot",
  homepage: "https://mangakakalot.com/",
  URLRegex,
  parseManga,
  parseChapters,
};
