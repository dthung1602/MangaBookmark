import {
  fetchAndLoad,
  extractNamesFromText,
  extractAuthorsFromNode,
  extractTagsFromNode,
  MangaSiteRedirectedException,
} from "../../scraping-service.js";
import ApplicationMeta from "../../../models/ApplicationMeta.js";

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
  const description = $("#contentBox")[0].children[2].data.trim();
  const alternativeNames = extractNamesFromText($(".story-alternative").text(), null, "Alternative :");
  const authors = extractAuthorsFromNode($, $(mangaInfoText[1]).find("a"));
  const tags = extractTagsFromNode($, $(mangaInfoText[6]).find("a"));
  return { description, alternativeNames, authors, tags };
}

function checkRedirect($) {
  const match = $("body")
    .text()
    .trim()
    .match(/REDIRECT : (http.*)/);
  if (match) {
    throw new MangaSiteRedirectedException(match[1]);
  }
}

async function parseManga(url) {
  const cookieQuery = ApplicationMeta.find({ key: ApplicationMeta.Keys.MANGAKAKALOT_CF_COOKIE });
  const useragentQuery = ApplicationMeta.find({ key: ApplicationMeta.Keys.MANGAKAKALOT_USER_AGENT });
  const [cookieRes, useragentRes] = await Promise.all([cookieQuery, useragentQuery]);
  const cookie = cookieRes[0].value;
  const userAgent = useragentRes[0].value;

  console.info("Using cookie & user agent for Mangakakalot", cookie, userAgent);

  const $ = await fetchAndLoad(url, {
    "User-Agent": userAgent,
    Cookie: cookie,
  });
  checkRedirect($);

  return {
    name: $("h1").text().trim(),
    link: url,
    image: $(".manga-info-pic img").attr("src").trim(),
    isCompleted: false,
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
  site: "Mangakakalot",
  homepage: "https://mangakakalot.com/",
  URLRegex,
  parseManga,
  parseChapters,
  parseAdditionalInfo,
  availableTags,
};
