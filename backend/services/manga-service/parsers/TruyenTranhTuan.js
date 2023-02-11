import { fetchAndLoad } from "../../scraping-service.js";

const URLRegex = /^https?:\/\/truyentranhtuan\.com\/.+$/;

async function parseChapters($) {
  const rows = $("#manga-chapter a");

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
    image: $(".manga-cover img")[0].attribs.src,
    isCompleted: $(".misc-infor").text().includes("Hoàn thành"),
    chapters: await parseChapters($),
  };
}

export default {
  active: true,
  lang: "vi",
  site: "TruyenTranhTuan",
  homepage: "http://truyentranhtuan.com/",
  URLRegex,
  parseManga,
  parseChapters,
};
