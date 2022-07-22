const { fetchAndLoad, findNodeWithHeader } = require("../../scraping-service");

const URLRegex = /^https?:\/\/mangapark\.net\/comic\/\d+\/[^/]+\/?$/;
const baseURL = "https://mangapark.net";

async function parseChapters($) {
  const rows = $("#chap-index").find(".episode-item a.visited");

  const chapters = [];
  for (let i = 0; i < rows.length; i++) {
    const row = $(rows[i]);
    chapters.push({
      name: row.text().trim().slice(2).replaceAll("\n", "").replaceAll("  ", " ").trim(),
      link: baseURL + row.attr("href"),
    });
  }

  return chapters;
}

async function parseManga(url) {
  const $ = await fetchAndLoad(url);

  return {
    name: $(".item-title").text(),
    link: url,
    image: $(".attr-cover img").attr("src"),
    isCompleted: findNodeWithHeader($, ".attr-main .attr-item", "Official status:").text().includes("Completed"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  active: true,
  lang: "en",
  site: "MangaPark",
  homepage: "https://mangapark.net/",
  URLRegex,
  parseManga,
  parseChapters,
};
