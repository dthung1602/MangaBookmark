const { uniq, uniqBy } = require("lodash");

const { fetch } = require("./utils");
const URLRegex = /^https?:\/\/mangadex\.org\/title\/([^/]+)(\/.*)?/;

async function parseChapters(id) {
  const limit = 100;
  let offset = 0;
  let totalChapterCount = 9999999999999;
  let counter = 25;

  const chapterAPIURL = `https://api.mangadex.org/chapter?manga=${id}&translatedLanguage[]=en&limit=${limit}&offset=`;
  let result = [];

  do {
    const response = await fetch(chapterAPIURL + offset);
    const data = JSON.parse(response.body);
    totalChapterCount = data.total;
    result = result.concat(data.data);
    offset += limit;
  } while (result.length < totalChapterCount && counter-- > 0);

  return uniqBy(result, (x) => x.attributes.chapter)
    .sort((a, b) => {
      return parseFloat(b.attributes.chapter) - parseFloat(a.attributes.chapter);
    })
    .map((chap) => ({
      name: "Chap " + chap.attributes.chapter + " " + chap.attributes.title,
      link: `https://mangadex.org/chapter/${chap.id}/1`,
    }));
}

async function parseAdditionalInfo(data) {
  const description = data.data.attributes.description.en;
  const alternativeNames = data.data.attributes.altTitles.map((x) => x.en);
  const tags = data.data.attributes.tags.map((x) => x.attributes.name.en.trim().toLowerCase());
  const authorsIds = data.data.relationships.filter((x) => x.type === "author" || x.type === "artist").map((x) => x.id);
  const authors = (
    await Promise.all(uniq(authorsIds).map((aid) => fetch(`https://api.mangadex.org/author/${aid}`)))
  ).map((res) => JSON.parse(res.body).data.attributes.name);
  return { description, alternativeNames, authors, tags };
}

function buildAPIURL(id) {
  return `https://api.mangadex.org/manga/${id}?includes[]=artist,author,cover_art`;
}

async function extractImage(data, id) {
  const imgId = data.data.relationships.find((x) => x.type === "cover_art").id;
  const imgAPIURL = `https://api.mangadex.org/cover/${imgId}`;
  const response = await fetch(imgAPIURL);
  const fileName = JSON.parse(response.body).data.attributes.fileName;
  return `https://uploads.mangadex.org/covers/${id}/${fileName}`;
}

async function parseManga(url) {
  const id = url.match(URLRegex)[1];
  const response = await fetch(buildAPIURL(id));
  const data = JSON.parse(response.body);

  return {
    name: data.data.attributes.title.en,
    link: url,
    image: await extractImage(data, id),
    isCompleted: data.data.attributes.status === "completed",
    chapters: await parseChapters(id),
    ...(await parseAdditionalInfo(data)),
  };
}

const availableTags = [
  "Action",
  "Adventure",
  "Comedy",
  "Crime",
  "Drama",
  "Fantasy",
  "Historical",
  "Horror",
  "Isekai",
  "Magical Girls",
  "Mecha",
  "Medical",
  "Mystery",
  "Philosophical",
  "Psychological",
  "Romance",
  "Sci-Fi",
  "Shoujo Ai",
  "Shounen Ai",
  "Slice of Life",
  "Sports",
  "Superhero",
  "Thriller",
  "Tragedy",
  "Wuxia",
  "Yaoi",
  "Yuri",
  "Aliens",
  "Animals",
  "Cooking",
  "Crossdressing",
  "Delinquents",
  "Demons",
  "Genderswap",
  "Ghosts",
  "Gyaru",
  "Harem",
  "Incest",
  "Loli",
  "Mafia",
  "Magic",
  "Martial Arts",
  "Military",
  "Monster Girls",
  "Monsters",
  "Music",
  "Ninja",
  "Office Workers",
  "Police",
  "Post-Apocalyptic",
  "Reincarnation",
  "Reverse Harem",
  "Samurai",
  "School Life",
  "Shota",
  "Supernatural",
  "Survival",
  "Time Travel",
  "Traditional Games",
  "Vampires",
  "Video Games",
  "Villainess",
  "Virtual Reality",
  "Zombies",
];

module.exports = {
  active: true,
  lang: "en",
  site: "MangaDex",
  homepage: "https://mangadex.org/",
  URLRegex,
  parseManga,
  parseChapters,
  parseAdditionalInfo,
  availableTags,
};
