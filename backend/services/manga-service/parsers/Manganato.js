import Mangakakalot from "./Mangakakalot.js";

const { parseManga, parseChapters, parseAdditionalInfo, availableTags } = Mangakakalot;
const URLRegex = /^https?:\/\/www\.natomanga\.com\/manga\/.+$/;

export default {
  active: true,
  lang: "en",
  site: "Manganato",
  homepage: "https://www.natomanga.com/",
  URLRegex,
  parseManga,
  parseChapters,
  parseAdditionalInfo,
  availableTags,
};
