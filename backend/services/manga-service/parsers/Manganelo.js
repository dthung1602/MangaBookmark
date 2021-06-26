const URLRegex = /^https?:\/\/manganelo.com\/manga\/.+$/;

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

module.exports = {
  active: false,
  lang: "en",
  site: "Manganelo",
  homepage: "https://manganelo.com/",
  URLRegex,
  parseManga,
  parseChapters,
};
