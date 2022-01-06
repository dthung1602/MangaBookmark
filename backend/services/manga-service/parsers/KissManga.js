const {
  fetchAndLoad,
  removeMangaNamePrefix,
  findNodeWithHeaderAndExtractNameFromText,
  findNodeWithHeaderAndExtractTagsFromText,
  findNodeWithHeaderAndExtractAuthorFromText,
} = require("../../scraping-service");

const URLRegex = /^https?:\/\/kissmanga\.org\/manga\/.+$/;
const BaseURL = "https://kissmanga.org";

async function parseChapters($) {
  const rows = $(".listing a");

  const chapters = [];
  for (let i = 0; i < rows.length; i++) {
    chapters.push({
      name: removeMangaNamePrefix(rows[i].children[0].data),
      link: BaseURL + rows[i].attribs.href,
    });
  }

  return chapters;
}

function parseAdditionalInfo($) {
  let description = $("#leftside .barContent .summary").text();
  const alternativeNames = findNodeWithHeaderAndExtractNameFromText($, "#leftside .barContent p", "Other name:");
  const tags = findNodeWithHeaderAndExtractTagsFromText($, "#leftside .barContent p", "Genres:");
  const authors = findNodeWithHeaderAndExtractAuthorFromText($, "#leftside .barContent p", "Authors:");
  return { description, alternativeNames, authors, tags };
}

async function parseManga(url) {
  const $ = await fetchAndLoad(url);

  return {
    name: $($("h2")[0]).text(),
    link: url,
    image: BaseURL + $(".cover_anime img").attr("src"),
    isCompleted: $(".item_static").text().includes("Completed"),
    chapters: await parseChapters($),
    ...parseAdditionalInfo($),
  };
}

const availableTags = [
  "Action manga",
  "Adventure manga",
  "Comedy manga",
  "Cooking manga",
  "Doujinshi manga",
  "Drama manga",
  "Fantasy manga",
  "Gender bender manga",
  "Harem manga",
  "Historical manga",
  "Horror manga",
  "Isekai manga",
  "Josei manga",
  "Manhua manga",
  "Manhwa manga",
  "Martial arts manga",
  "Mature manga",
  "Mecha manga",
  "Medical manga",
  "Mystery manga",
  "One shot manga",
  "Psychological manga",
  "Romance manga",
  "School life manga",
  "Sci fi manga",
  "Seinen manga",
  "Shoujo manga",
  "Shoujo ai manga",
  "Shounen manga",
  "Shounen ai manga",
  "Slice of life manga",
  "Smut manga",
  "Sports manga",
  "Supernatural manga",
  "Tragedy manga",
  "Webtoons manga",
  "Yaoi manga",
  "Yuri manga",
];

module.exports = {
  active: true,
  lang: "en",
  site: "KissManga",
  homepage: "https://kissmanga.org",
  URLRegex,
  parseManga,
  parseChapters,
  parseAdditionalInfo,
  availableTags,
};
