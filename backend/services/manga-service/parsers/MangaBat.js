const { fetchAndLoad, extractNamesFromText, extractAuthorsFromNode, extractTagsFromNode } = require("./utils");

const URLRegex = /^https?:\/\/(m|read)\.mangabat\.com\/read-.+$/;

async function parseChapters($) {
  const rows = $(".chapter-name");

  const chapters = [];
  for (let i = 0; i < rows.length; i++) {
    chapters.push({
      name: rows[i].children[0].data,
      link: rows[i].attribs.href,
    });
  }

  return chapters;
}

function parseAdditionalInfo($) {
  const description = $("#panel-story-info-description").text().trim();
  const alternativeNames = extractNamesFromText($(".info-alternative").parent().next().text(), ";");
  const authors = extractAuthorsFromNode($, $(".info-author").parent().next().find("a"));
  const tags = extractTagsFromNode($, $(".info-genres").parent().next().find("a"));
  return { description, alternativeNames, authors, tags };
}

async function parseManga(url) {
  const $ = await fetchAndLoad(url);

  return {
    name: $("h1").text(),
    link: url,
    image: $(".info-image img").attr("src"),
    isCompleted: $(".story-info-right").text().includes("Completed"),
    chapters: await parseChapters($),
    ...parseAdditionalInfo($),
  };
}

module.exports = {
  lang: "en",
  site: "MangaBat",
  homepage: "https://m.mangabat.com/hp",
  URLRegex,
  parseManga,
  parseChapters,
  parseAdditionalInfo,
};
