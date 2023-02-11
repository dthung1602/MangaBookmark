import { fetchAndLoad } from "../../scraping-service.js";

const URLRegex = /^https?:\/\/ww4\.mangafox\.online\/.+$/;

async function parseChapters($) {
  const rows = $(".chapter_number a");

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
    name: $(".manga_name h1").text(),
    link: url,
    image: $(".manga_info_img img").attr("src"),
    isCompleted: false, // info not available
    chapters: await parseChapters($),
  };
}

export default {
  active: false,
  lang: "en",
  site: "MangaFox",
  homepage: "https://ww4.mangafox.online/",
  URLRegex,
  parseManga,
  parseChapters,
};
