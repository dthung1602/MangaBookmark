const { fetchAndLoad, extractTagsFromNode, extractAuthorsFromNode } = require("./utils");

const URLRegex = /^https?:\/\/fanfox\.net\/manga\/.+/;
const BaseURL = "http://fanfox.net";

async function parseChapters($) {
  const rows = $("#chapterlist a[target]");

  const chapters = [];
  for (let i = 0; i < rows.length; i++) {
    chapters.push({
      name: rows[i].attribs.title,
      link: BaseURL + rows[i].attribs.href,
    });
  }

  return chapters;
}

function parseAdditionalInfo($) {
  const description = $(".detail-info-right .fullcontent").text().trim();
  const authors = extractAuthorsFromNode($, ".detail-info-right-say a");
  const tags = extractTagsFromNode($, ".detail-info-right-tag-list a");
  return { description, authors, tags };
}

async function parseManga(url) {
  const $ = await fetchAndLoad(url, {}, "isAdult=1");

  return {
    name: $(".detail-info-right-title-font").text(),
    link: url,
    image: $(".detail-info-cover-img").attr("src"),
    isCompleted: $(".detail-info-right-title-tip").text().includes("Completed"),
    chapters: await parseChapters($),
    ...parseAdditionalInfo($),
  };
}

const availableTags = [
  "All",
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Fantasy",
  "Martial Arts",
  "Shounen",
  "Horror",
  "Supernatural",
  "Harem",
  "Psychological",
  "Romance",
  "School Life",
  "Shoujo",
  "Mystery",
  "Sci-fi",
  "Seinen",
  "Tragedy",
  "Ecchi",
  "Sports",
  "Slice of Life",
  "Mature",
  "Shoujo Ai",
  "Webtoons",
  "Doujinshi",
  "One Shot",
  "Smut",
  "Yaoi",
  "Josei",
  "Historical",
  "Shounen Ai",
  "Gender Bender",
  "Adult",
  "Yuri",
  "Mecha",
  "Lolicon",
  "Shotacon",
];

module.exports = {
  active: true,
  lang: "en",
  site: "FanFox",
  homepage: "http://fanfox.net/",
  URLRegex,
  parseManga,
  parseChapters,
  parseAdditionalInfo,
  availableTags,
};
