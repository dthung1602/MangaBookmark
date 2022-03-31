const { fetchAndLoad, cleanText } = require("../../scraping-service");

const URLRegex = /^https?:\/\/www\.mangaread\.org\/manga\/.+$/;

function parseChapters($) {
  const rows = $(".page-content-listing.single-page a");

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

  $("h1 span").remove();

  return {
    name: cleanText($("h1").text()),
    link: url,
    image: $(".summary_image img").attr("data-src"),
    isCompleted: $(".post-status").text().includes("Completed"),
    chapters: parseChapters($),
  };
}

module.exports = {
  active: true,
  lang: "en",
  site: "MangaRead",
  homepage: "https://www.mangaread.org",
  URLRegex,
  parseManga,
  parseChapters,
};
