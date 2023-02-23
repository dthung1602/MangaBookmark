import { fetchAndLoad } from "../../scraping-service.js";

const URLRegex = /^https?:\/\/(chap|w)\.mangairo\.com\/story-.+$/;

async function parseChapters($) {
  const rows = $("#chapter_list a");

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
    image: $(".avatar").attr("src"),
    isCompleted: $(".story_info_right").text().includes("Completed"),
    chapters: await parseChapters($),
  };
}

export default {
  active: true,
  lang: "en",
  site: "Mangairo",
  homepage: "https://w.mangairo.com/home",
  URLRegex,
  parseManga,
  parseChapters,
};
