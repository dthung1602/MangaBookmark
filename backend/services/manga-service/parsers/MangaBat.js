import {
  fetchAndLoad,
  extractNamesFromText,
  extractAuthorsFromNode,
  extractTagsFromNode,
} from "../../scraping-service.js";

const URLRegex = /^https?:\/\/(read|h\.)mangabat\.com\/read-.+$/;

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

const availableTags = [
  "Action",
  "Adult",
  "Adventure",
  "Comedy",
  "Cooking",
  "Doujinshi",
  "Drama",
  "Ecchi",
  "Fantasy",
  "Gender bender",
  "Harem",
  "Historical",
  "Horror",
  "Isekai",
  "Josei",
  "Manhua",
  "Manhwa",
  "Martial arts",
  "Mature",
  "Mecha",
  "Medical",
  "Mystery",
  "One shot",
  "Psychological",
  "Romance",
  "School life",
  "Sci fi",
  "Seinen",
  "Shoujo",
  "Shoujo ai",
  "Shounen",
  "Shounen ai",
  "Slice of life",
  "Smut",
  "Sports",
  "Supernatural",
  "Tragedy",
  "Webtoons",
  "Yaoi",
  "Yuri",
];

export default {
  active: true,
  lang: "en",
  site: "MangaBat",
  homepage: "https://h.mangabat.com/mangabat",
  URLRegex,
  parseManga,
  parseChapters,
  parseAdditionalInfo,
  availableTags,
};
