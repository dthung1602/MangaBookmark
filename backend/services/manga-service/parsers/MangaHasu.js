const { fetchAndLoad } = require("./utils");

const URLRegex = /^https?:\/\/mangahasu\.se\/.+/;

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

  return {
    name: $("h1").text(),
    link: url,
    image: $(".info-img img").attr("src"),
    isCompleted: $(".detail_item a").text().includes("Completed"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  active: true,
  lang: "en",
  site: "MangaHasu",
  homepage: "http://mangahasu.se/",
  URLRegex,
  parseManga,
  parseChapters,
};
