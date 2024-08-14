import {
  fetchAndLoad,
  cleanText,
  extractNamesFromText,
  extractTagsFromNode,
  extractAuthorsFromNode,
} from "../../scraping-service.js";

const URLRegex = /^https?:\/\/(www\.)?readm\.org\/manga\/.+$/;
const BaseURL = "https://www.readm.org";

async function parseChapters($) {
  const rows = $(".episodes-list a");

  const chapters = [];
  for (let i = 0; i < rows.length; i++) {
    chapters.push({
      name: rows[i].children[0].data,
      link: BaseURL + rows[i].attribs.href,
    });
  }

  return chapters;
}

function parseAdditionalInfo($) {
  let description = cleanText($("#tv-series-desc+p").text());
  const alternativeNames = extractNamesFromText($(".sub-title.pt-sm").text(), null);
  const tags = extractTagsFromNode($, ".series-summary-wrapper .list a");
  const authors = extractAuthorsFromNode($, ".first_and_last a");
  return { description, alternativeNames, authors, tags };
}

async function parseManga(url) {
  const $ = await fetchAndLoad(url);

  return {
    name: $(".page-title").text(),
    link: url,
    image: BaseURL + $(".series-profile-thumb").attr("src"),
    isCompleted: $(".series-status").text().includes("Completed"),
    chapters: await parseChapters($),
    ...parseAdditionalInfo($),
  };
}

const availableTags = [];

export default {
  active: false,
  lang: "en",
  site: "ReadM",
  homepage: "https://www.readm.org/",
  URLRegex,
  parseManga,
  parseChapters,
  parseAdditionalInfo,
  availableTags,
};
