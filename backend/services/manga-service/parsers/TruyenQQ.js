import {
  fetchAndLoad,
  extractNamesFromText,
  extractTagsFromNode,
  extractAuthorsFromText,
} from "../../scraping-service.js";

const URLRegex = /^https?:\/\/truyenqqto\.com\/truyen-tranh\/.+$/;

async function parseChapters($) {
  const rows = $(".works-chapter-list a");

  const chapters = [];
  for (let i = 0; i < rows.length; i++) {
    chapters.push({
      name: rows[i].children[0].data.trim(),
      link: rows[i].attribs.href.trim(),
    });
  }

  return chapters;
}

function parseAdditionalInfo($) {
  let description = $(".story-detail-info.detail-content").text().trim();
  const alternativeNames = extractNamesFromText($(".txt .othername h2").text(), ";", "Tên Khác:");
  const tags = extractTagsFromNode($, $(".list01 a"));
  const authors = extractAuthorsFromText($(".txt .author a").text(), ",", "Tác giả:");
  return { description, alternativeNames, authors, tags };
}

async function parseManga(url) {
  url = url.replace("https://", "http://");

  const $ = await fetchAndLoad(url);

  return {
    name: $("h1").text().trim(),
    link: url,
    image: $(".book_avatar img").attr("src"),
    isCompleted: $(".txt .status h2").text().includes("Hoàn Thành"),
    chapters: await parseChapters($),
    ...parseAdditionalInfo($),
  };
}

export default {
  active: true,
  lang: "vi",
  site: "TruyenQQ",
  homepage: "https://truyenqqto.com/",
  URLRegex,
  parseManga,
  parseChapters,
  parseAdditionalInfo,
};
