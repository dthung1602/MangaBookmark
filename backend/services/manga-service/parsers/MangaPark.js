const { fetchAndLoad } = require("../../scraping-service");

const URLRegex = /^https?:\/\/mangapark\.net\/title\/.+$/;
const baseURL = "https://mangapark.net";

async function parseChapters($) {
  // TODO call GQL
  const rows = $(".file-list-by-serial").find(".space-x-1 a");

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
    name: $("main .text-2xl.font-bold a").text(),
    link: url,
    image: $("main img.w-full").attr("src"),
    isCompleted: $("[status='completed']").length >= 1,
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
