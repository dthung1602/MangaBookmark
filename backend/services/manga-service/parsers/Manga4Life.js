import {
  cleanText,
  fetchAndLoad,
  findNodeWithHeader,
  findNodeWithHeaderAndExtractNameFromText,
  findNodeWithHeaderAndExtractTagsFromText,
  findNodeWithHeaderAndExtractAuthorFromText,
} from "../../scraping-service.js";

const URLRegex = /^https?:\/\/manga4life\.com\/manga\/.+$/;

const chapterRegex = /vm.Chapters = (.*);/;

/**
 * Copied from manga4life FE
 */
const chapterURLEncode = function (e) {
  let Index = "";
  const t = e.substring(0, 1);
  1 != t && (Index = "-index-" + t);
  let n = parseInt(e.slice(1, -1)),
    m = "",
    a = e[e.length - 1];
  return 0 != a && (m = "." + a), "-chapter-" + n + m + Index + ".html";
};

/**
 * Copied from manga4life FE
 */
const chapterDisplay = function (e) {
  const t = parseInt(e.slice(1, -1)),
    n = e[e.length - 1];
  return 0 == n ? t : t + "." + n;
};

async function parseChapters($) {
  let urlParts = $("meta[property='og:url']").attr("content").split("/");
  let mangaSlug = urlParts.pop();
  if (!mangaSlug) {
    mangaSlug = urlParts.pop();
  }
  const baseChapterURL = "https://manga4life.com/read-online/" + mangaSlug;

  let rawChapters = [];
  $("script").each(function () {
    const text = this.children[0]?.data || "";
    const match = text.match(chapterRegex);
    if (match) {
      rawChapters = JSON.parse(match[1]);
    }
  });

  const chapters = [];
  for (let chapter of rawChapters) {
    chapters.push({
      name: (chapter.Type !== "" ? chapter.Type : "Chapter") + " " + chapterDisplay(chapter.Chapter),
      link: baseChapterURL + chapterURLEncode(chapter.Chapter),
    });
  }

  return chapters;
}

function parseAdditionalInfo($) {
  const selector = ".MainContainer .BoxBody > div.row .list-group .list-group-item";
  const description = cleanText(findNodeWithHeader($, selector, "Description:").text(), "Description:");
  const alternativeNames = findNodeWithHeaderAndExtractNameFromText($, selector, "Alternate Name(s):");
  const tags = findNodeWithHeaderAndExtractTagsFromText($, selector, "Genre(s):");
  const authors = findNodeWithHeaderAndExtractAuthorFromText($, selector, "Author(s):");
  return { description, alternativeNames, authors, tags };
}

async function parseManga(url) {
  const $ = await fetchAndLoad(url);

  return {
    name: $("h1").text(),
    link: url,
    image: $("img.img-fluid.bottom-5").attr("src"),
    isCompleted: $(".list-group.list-group-flush").text().includes("Complete (Scan)"),
    chapters: await parseChapters($),
    ...parseAdditionalInfo($),
  };
}

const availableTags = [
  "action",
  "adult",
  "adventure",
  "comedy",
  "doujinshi",
  "drama",
  "ecchi",
  "fantasy",
  "gender bender",
  "harem",
  "hentai",
  "historical",
  "horror",
  "isekai",
  "josei",
  "lolicon",
  "martial arts",
  "mature",
  "mecha",
  "mystery",
  "psychological",
  "romance",
  "school life",
  "sci-fi",
  "seinen",
  "shotacon",
  "shoujo",
  "shoujo ai",
  "shounen",
  "shounen ai",
  "slice of life",
  "smut",
  "sports",
  "supernatural",
  "tragedy",
  "yaoi",
  "yuri",
];

export default {
  active: false,
  lang: "en",
  site: "Manga4Life",
  homepage: "https://manga4life.com",
  URLRegex,
  parseManga,
  parseChapters,
  parseAdditionalInfo,
  availableTags,
};
