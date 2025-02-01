import {
  cleanText,
  fetchAndLoad,
  findNodeWithHeaderAndExtractAuthorFromText,
  findNodeWithHeaderAndExtractTagsFromText,
} from "../../scraping-service.js";

const URLRegex = /^https?:\/\/weebcentral\.com\/series\/.+$/;

async function parseChapters(link) {
  const lastPartIdx = link.lastIndexOf("/");
  const chapterLink = link.substring(0, lastPartIdx) + "/full-chapter-list";
  const $ = await fetchAndLoad(chapterLink);

  const links = $("a")
    .toArray()
    .map((x) => $(x).attr("href"))
    .filter((x) => x !== "#top");
  const names = $("a > span:nth-child(2) > span:first-child")
    .toArray()
    .map((x) => $(x).text());

  return links.map((link, i) => ({
    link,
    name: names[i],
  }));
}

function parseAdditionalInfo($) {
  const rightPanelSelector = "main section:first-child section:nth-child(2) section:nth-child(3)";
  const leftPanelSelector = "main section:first-child section:first-child";

  const description = cleanText($(`${rightPanelSelector} p`).text());
  const alternativeNames = $(`${rightPanelSelector} ul ul li`)
    .toArray()
    .map((x) => cleanText($(x).text()));

  const tags = findNodeWithHeaderAndExtractTagsFromText($, leftPanelSelector + " ul li", "Tags(s):");
  const authors = findNodeWithHeaderAndExtractAuthorFromText($, leftPanelSelector + " ul li", "Author(s):");
  return { description, alternativeNames, authors, tags };
}

async function parseManga(url) {
  if (url.endsWith("/")) {
    url = url.slice(0, url.length - 1);
  }
  const $ = await fetchAndLoad(url);

  return {
    name: $("main section:first-child section:nth-child(2) h1").text(),
    link: url,
    image: $("main section picture img").attr("src"),
    isCompleted: $("main section ul").text().includes("Complete"),
    chapters: await parseChapters(url),
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
  "other",
];

export default {
  active: true,
  lang: "en",
  site: "WeebCentral",
  homepage: "https://weebcentral.com/",
  URLRegex,
  parseManga,
  parseChapters,
  parseAdditionalInfo,
  availableTags,
};
