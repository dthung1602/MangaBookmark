const { fetchAndLoad } = require("./utils");

const URLRegex = /^https?:\/\/(m|read)\.mangabat\.com\/read-.+$/;

async function parseChapters($) {
  const rows = $(".chapter-name");

  const chapters = [];
  for (let i = 0; i < rows.length; i++) {
    chapters.push({
      name: rows[i].children[0].data,
      link: rows[i].attribs.href,
    });
  }

  return chapters;
}

async function parseManga(url) {
  const $ = await fetchAndLoad(url);

  return {
    name: $("h1").text(),
    link: url,
    image: $(".info-image img").attr("src"),
    isCompleted: $(".story-info-right").text().includes("Completed"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  lang: "en",
  site: "MangaBat",
  homepage: "https://m.mangabat.com/hp",
  URLRegex,
  parseManga,
  parseChapters,
};
