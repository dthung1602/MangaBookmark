const { uniq } = require("lodash");

const { fetchAndLoad, extractNamesFromText, extractAuthorsFromNode, extractTagsFromNode } = require("./utils");

const URLRegex = /^https?:\/\/otakusan\.net\/(MangaDetail|manga-detail)\/[0-9]+\/.+$/;

async function parseChapters($) {
  const rows = $("table.mdi-table .read-chapter a");

  const chapters = [];
  for (let i = 0; i < rows.length; i++) {
    chapters.push({
      name: rows[i].attribs.title,
      link: "https://otakusan.net" + rows[i].attribs.href,
    });
  }

  return chapters;
}

function parseAdditionalInfo($) {
  const description = $(".summary").text().trim();
  const alternativeNames = extractNamesFromText($(".table-info th:contains('Other Name')").parent().next().text());
  const authors = uniq(
    extractAuthorsFromNode($, $("th:contains('Tác Giả'), th:contains('Họa Sĩ')").parent().find("a")),
  );
  const tags = extractTagsFromNode($, $(".genres .tag-link"));
  return { description, alternativeNames, authors, tags };
}

async function parseManga(url) {
  const $ = await fetchAndLoad(url);

  return {
    name: $(".manga-top-info .title").text().trim(),
    link: url,
    image: $(".manga-top-img img").attr("src"),
    isCompleted: $(".manga-top .table-info").text().includes("Done"),
    chapters: await parseChapters($),
    ...parseAdditionalInfo($),
  };
}

module.exports = {
  lang: "vi",
  site: "Otakusan",
  homepage: "https://otakusan.net/",
  URLRegex,
  parseManga,
  parseChapters,
  parseAdditionalInfo,
};
