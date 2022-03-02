const { uniq } = require("lodash");

const {
  fetchAndLoad,
  extractNamesFromText,
  extractAuthorsFromNode,
  extractTagsFromNode,
} = require("../../scraping-service");

const URLRegex = /^https?:\/\/otakusan\.net\/(MangaDetail|manga-detail)\/[0-9]+\/.+$/;

function extractName($) {
  return $(".manga-top-info .title").text().trim();
}

async function parseChapters($) {
  const rows = $("table.mdi-table .read-chapter a");
  const prefix = extractName($) + " - ";

  const chapters = [];
  for (let i = 0; i < rows.length; i++) {
    chapters.push({
      name: rows[i].attribs.title.replace(prefix, ""),
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
    name: extractName($),
    link: url,
    image: $(".manga-top-img img").attr("src"),
    isCompleted: $(".manga-top .table-info").text().includes("Done"),
    chapters: await parseChapters($),
    ...parseAdditionalInfo($),
  };
}

const availableTags = [
  "4-Koma",
  "Action",
  "Adult",
  "Adventure",
  "Comedy",
  "Cooking",
  "Dark Fantansy",
  "Drama",
  "Ecchi",
  "Fantasy",
  "Gender Bender",
  "Harem",
  "Historical",
  "Horror",
  "Isekai/Tensei",
  "Josei",
  "Magic",
  "Martial Art",
  "Mature",
  "Mecha",
  "Music",
  "Mystery",
  "Office workers",
  "One shot",
  "Psychological",
  "Reverse harem",
  "Romance",
  "Sci-Fi",
  "School Life",
  "Seinen",
  "Shoujo",
  "Shoujo Ai",
  "Shounen",
  "Shounen Ai",
  "Slice of life",
  "Smut",
  "Sports",
  "Super Natural",
  "Tragedy",
  "Trap/Cross-dressing",
  "VnComic",
  "Webtoon",
  "Yaoi",
  "Yuri",
];

module.exports = {
  active: true,
  lang: "vi",
  site: "Otakusan",
  homepage: "https://otakusan.net/",
  URLRegex,
  parseManga,
  parseChapters,
  parseAdditionalInfo,
  availableTags,
};
