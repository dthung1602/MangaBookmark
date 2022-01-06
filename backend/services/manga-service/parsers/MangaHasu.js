const {
  fetchAndLoad,
  extractNamesFromText,
  extractTagsFromText,
  extractAuthorsFromText,
  useImageProxy,
} = require("../../scraping-service");

const URLRegex = /^https?:\/\/mangahasu\.se\/.+/;

function getInfoRowByTitle($, title) {
  let value = "";
  $(".box-des .detail_item").each((i, e) => {
    const text = $(e).text().trim();
    if (text.includes(title)) {
      value = text;
    }
  });
  return value;
}

function parseAdditionalInfo($) {
  const description = $(".wrapper_content > .content-info").text().trim();
  const alternativeNames = extractNamesFromText($(".info-title h3").text(), ";");
  const tags = extractTagsFromText(getInfoRowByTitle($, "Genre"), ",", "Genre(s):");
  const authors = [
    ...extractAuthorsFromText(getInfoRowByTitle($, "Author"), ";", "Author(s)"),
    ...extractAuthorsFromText(getInfoRowByTitle($, "Artist"), ";", "Artist(s)"),
  ];
  return { description, alternativeNames, authors, tags };
}

async function parseChapters($) {
  const rows = $(".list-chapter a");

  const chapters = [];
  for (let i = 0; i < rows.length; i++) {
    chapters.push({
      name: rows[i].children[1].data,
      link: rows[i].attribs.href,
    });
  }

  return chapters;
}

async function parseManga(url) {
  const $ = await fetchAndLoad(url);
  const image = $(".info-img img").attr("src");

  return {
    name: $("h1").text(),
    link: url,
    image: useImageProxy(image, "MangaHasu"),
    isCompleted: $(".detail_item a").text().includes("Completed"),
    chapters: await parseChapters($),
    ...parseAdditionalInfo($),
  };
}

const availableTags = [
  "4-koma",
  "action",
  "adaptation",
  "adult",
  "adventure",
  "aliens",
  "animals",
  "anime",
  "anthology",
  "award winning",
  "bara",
  "comedy",
  "comic",
  "cooking",
  "crime",
  "crossdressing",
  "delinquents",
  "demons",
  "doujinshi",
  "drama",
  "ecchi",
  "fan colored",
  "fantasy",
  "full color",
  "game",
  "gender bender",
  "genderswap",
  "ghosts",
  "gore",
  "gyaru",
  "harem",
  "historical",
  "horror",
  "incest",
  "isekai",
  "josei",
  "live action",
  "loli",
  "lolicon",
  "long strip",
  "mafia",
  "magic",
  "magical girls",
  "manga reviews",
  "martial arts",
  "mature",
  "mecha",
  "medical",
  "military",
  "monster girls",
  "monsters",
  "music",
  "mystery",
  "netorare/ntr",
  "ninja",
  "office",
  "office workers",
  "official colored",
  "one shot",
  "others",
  "philosophical",
  "police",
  "post-apocalyptic",
  "psychological",
  "reincarnation",
  "reverse harem",
  "romance",
  "samurai",
  "school",
  "school life",
  "school life. seinen",
  "sci-fi",
  "seinen",
  "seinen  supernatural",
  "sexual violence",
  "shota",
  "shotacon",
  "shoujo",
  "shoujo ai",
  "shoujoai",
  "shounen",
  "shounen ai",
  "shounenai",
  "slice of life",
  "sm/bdsm",
  "smut",
  "sports",
  "super power",
  "superhero",
  "supernatural",
  "survival",
  "thriller",
  "time travel",
  "traditional games",
  "tragedy",
  "uncategorized",
  "user created",
  "vampire",
  "vampires",
  "video games",
  "villainess",
  "violence",
  "virtual reality",
  "web comic",
  "webtoon",
  "webtoons",
  "western",
  "wuxia",
  "yaoi",
  "youkai",
  "yuri",
  "zombies",
];

module.exports = {
  active: true,
  lang: "en",
  site: "MangaHasu",
  homepage: "http://mangahasu.se/",
  URLRegex,
  parseManga,
  parseChapters,
  parseAdditionalInfo,
  availableTags,
};
