const URLRegex = /^https?:\/\/(ww[12]\.)?mangakakalots\.com\/manga\/.+$/;
const baseURL = "https://ww2.mangakakalots.com";

import { fetchAndLoad } from "../../scraping-service.js";
import Mangakakalot from "./Mangakakalot.js";

const { parseAdditionalInfo, availableTags } = Mangakakalot;

async function parseChapters($) {
  const rows = $(".chapter-list a");

  const chapters = [];
  for (let i = 0; i < rows.length; i++) {
    chapters.push({
      name: rows[i].children[0].data.trim(),
      link: baseURL + rows[i].attribs.href.trim(),
    });
  }

  return chapters;
}

async function parseManga(url) {
  const $ = await fetchAndLoad(url);

  return {
    name: $("h1").text().trim(),
    link: url,
    image: baseURL + $(".manga-info-pic img").attr("src").trim(),
    isCompleted: $(".manga-info-text li")[2].children[0].data === "Status : Completed",
    chapters: await parseChapters($),
    ...parseAdditionalInfo($),
  };
}

export default {
  active: false,
  lang: "en",
  site: "MangakakalotS",
  homepage: "https://ww2.mangakakalots.com/",
  URLRegex,
  parseManga,
  parseChapters,
  parseAdditionalInfo,
  availableTags,
};
