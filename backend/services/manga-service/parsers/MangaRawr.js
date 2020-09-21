const { fetchAndLoad } = require("./utils");

const URLRegex = /^https?:\/\/mangarawr\.com\/manga\/.+$/;

async function parseChapters($) {
  const rows = $(".wp-manga-chapter a");

  const chapters = [];
  for (let i = 0; i < rows.length; i++) {
    chapters.push({
      name: rows[i].children[0].data.trim(),
      link: rows[i].attribs.href,
    });
  }

  return chapters;
}

async function parseManga(url) {
  const $ = await fetchAndLoad(url);

  return {
    name: $('meta[property="og:title"]').attr("content"),
    link: url,
    image: $(".wp-post-image").attr("src"),
    isCompleted: $(".summary-content").text().includes("Completed"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  site: "MangaRawr",
  homepage: "https://mangarawr.com",
  URLRegex,
  parseManga,
  parseChapters,
};
