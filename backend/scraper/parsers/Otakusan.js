const { fetchAndLoad } = require("./utils");

const URLRegex = /^https?:\/\/otakusan\.net\/MangaDetail\/[0-9]+\/.+$/;

async function parseChapters($) {
  const rows = $("table.mdi-table .read-chapter a");

  const chapters = [];
  for (let i = 0; i < rows.length; i++) {
    chapters.push({
      name: rows[i].attribs.title,
      link: "https://otakusan.net" + rows[i].attribs.href,
    });
  }

  return chapters;
}

async function parseManga(url) {
  const $ = await fetchAndLoad(url);

  return {
    name: $(".title").text().trim(),
    link: url,
    image: $(".manga-top-img img").attr("src"),
    isCompleted: $(".manga-top .table-info").text().includes("Done"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  site: "Otakusan",
  homepage: "https://otakusan.net/",
  URLRegex,
  parseManga,
  parseChapters,
};
