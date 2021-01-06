const { fetchAndLoad } = require("./utils");

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

async function parseManga(url) {
  const $ = await fetchAndLoad(url, {}, "isAdult=1");

  return {
    name: $(".detail-info-right-title-font").text(),
    link: url,
    image: $(".detail-info-cover-img").attr("src"),
    isCompleted: $(".detail-info-right-title-tip").text().includes("Completed"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  language: "en",
  site: "FanFox",
  homepage: "http://fanfox.net/",
  URLRegex,
  parseManga,
  parseChapters,
};
