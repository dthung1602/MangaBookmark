import lodash from "lodash";
import { fetch } from "../../scraping-service.js";

const { uniqBy, flatten } = lodash;
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

function parseAdditionalInfo(data) {
  const description = data.data.attributes.description.en;
  const alternativeNames = flatten(data.data.attributes.altTitles.map((x) => Object.values(x)));
  const tags = data.data.attributes.tags.map((x) => x.attributes.name.en.trim().toLowerCase());

  const authors = uniqBy(
    data.data.relationships.filter((x) => x.type === "author" || x.type === "artist"),
    "id",
  ).map((author) => author.attributes.name);
  return { description, alternativeNames, authors, tags };
}

function buildAPIURL(id) {
  return `https://api.mangadex.org/manga/${id}?includes[]=artist&includes[]=author&includes[]=cover_art`;
}

function extractImage(data, id) {
  const coverArt = data.data.relationships.find((x) => x.type === "cover_art");
  const fileName = coverArt.attributes.fileName;
  return `https://mangadex.org/covers/${id}/${fileName}`;
}

async function parseManga(url) {
  const id = url.match(URLRegex)[1];
  const response = await fetch(buildAPIURL(id));
  const data = JSON.parse(response.body);

  return {
    name: data.data.attributes.title.en,
    link: url,
    image: extractImage(data, id),
    isCompleted: data.data.attributes.status === "completed",
    chapters: await parseChapters(id),
    ...parseAdditionalInfo(data),
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

export default {
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
