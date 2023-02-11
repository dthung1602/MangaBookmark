const URLRegex = /^https?:\/\/mangarock.com\/manga\/mrs-serie-[0-9]+$/;

function parseChapters() {
  return [];
}

async function parseManga(url) {
  return {
    name: "",
    link: url,
    image: "",
    isCompleted: false,
    chapters: url,
  };
}

export default {
  active: false,
  lang: "en",
  site: "MangaRock",
  homepage: "https://mangarock.com/",
  URLRegex,
  parseManga,
  parseChapters,
};
