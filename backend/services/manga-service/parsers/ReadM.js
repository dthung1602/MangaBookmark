const { fetchAndLoad } = require("./utils");

const URLRegex = /^https?:\/\/(www\.)?readm\.org\/manga\/[0-9]+$/;
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

async function parseManga(url) {
  const $ = await fetchAndLoad(url);

  return {
    name: $(".page-title").text(),
    link: url,
    image: BaseURL + $(".series-profile-thumb").attr("src"),
    isCompleted: $(".series-status").text().includes("Completed"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  language: "en",
  site: "ReadM",
  homepage: "https://www.readm.org/",
  URLRegex,
  parseManga,
  parseChapters,
};
