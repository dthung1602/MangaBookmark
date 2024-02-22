import { fetchAndLoad } from "../../scraping-service.js";
import {
  extractAuthorsFromNode,
  extractTagsFromNode,
  extractNamesFromText,
  cleanText,
} from "../../scraping-service.js";

const URLRegex = /^https?:\/\/chapmanganato\.to\/manga.+$/;

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
  const alternativeNames = extractNamesFromText($(mangaInfoText[0]).text(), null);
  const authors = extractAuthorsFromNode($, $(mangaInfoText[1]).find("a"));
  const tags = extractTagsFromNode($, $(mangaInfoText[3]).find("a"));
  return { description, alternativeNames, authors, tags };
}

async function parseManga(url) {
  url = url.replace("readmanganato.com", "chapmanganato.com");
  let $ = await fetchAndLoad(url);
  if ($("title").text().trim().toLowerCase() === "404 not found" && !url.includes("readmanganato")) {
    url = url.replace("manganato", "readmanganato");
  }

  $ = await fetchAndLoad(url);

  return {
    name: $("h1").text().trim(),
    link: url,
    image: $(".info-image img").attr("src").trim(),
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
  site: "Manganato",
  homepage: "https://chapmanganato.com/",
  URLRegex,
  parseManga,
  parseChapters,
  parseAdditionalInfo,
  availableTags,
};
