const { fetchAndLoad } = require("./utils");
const { extractAuthorsFromNode, extractTagsFromNode, extractNamesFromText, cleanText } = require("./utils");

const URLRegex = /^https?:\/\/(chap\.|m\.)?manganelo\.com\/manga.+$/;

async function parseChapters($) {
  const rows = $(".panel-story-chapter-list a");

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
  const mangaInfoText = $(".variations-tableInfo .table-value");
  const description = cleanText($("#panel-story-info-description").text(), "Description :");
  const alternativeNames = extractNamesFromText($(mangaInfoText[0]).text());
  const authors = extractAuthorsFromNode(mangaInfoText[1]);
  const tags = extractTagsFromNode(mangaInfoText[3]);
  return { description, alternativeNames, authors, tags };
}

async function parseManga(url) {
  const $ = await fetchAndLoad(url);

  return {
    name: $("h1").text().trim(),
    link: url,
    image: $(".info-image img").attr("src").trim(),
    isCompleted: $(".story-info-right").text().includes("Completed"),
    chapters: await parseChapters($),
    ...parseAdditionalInfo($),
  };
}

module.exports = {
  lang: "en",
  site: "Manganelo",
  homepage: "https://manganelo.com/",
  URLRegex,
  parseManga,
  parseChapters,
  parseAdditionalInfo,
};
