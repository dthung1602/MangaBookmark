import { fetchAndLoad } from "../../scraping-service.js";

const URLRegex = /^https?:\/\/www\.mangapanda\.com\/.+$/;
const baseURL = "http://www.mangapanda.com";

async function parseChapters($) {
  const rows = $("#listing a");

  const chapters = [];
  for (let i = 0; i < rows.length; i++) {
    chapters.push({
      name: rows[i].children[0].data,
      link: baseURL + rows[i].attribs.href,
    });
  }

  return chapters;
}

async function parseManga(url) {
  const $ = await fetchAndLoad(url);

  return {
    name: $(".aname").text(),
    link: url,
    image: $("#mangaimg img").attr("src"),
    isCompleted: $("#mangaproperties table").text().includes("Completed"),
    chapters: await parseChapters($),
  };
}

export default {
  active: false,
  lang: "en",
  site: "MangaPanda",
  homepage: "http://www.mangapanda.com/",
  URLRegex,
  parseManga,
  parseChapters,
};
