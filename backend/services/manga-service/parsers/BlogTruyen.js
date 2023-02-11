import {
  fetchAndLoad,
  findNodeWithHeaderAndExtractNameFromText,
  extractTagsFromNode,
  extractAuthorsFromNode,
} from "../../scraping-service.js";

const URLRegex = /^https?:\/\/blogtruyen\.vn\/[0-9]+\/.+/;

async function parseChapters($) {
  const rows = $("#list-chapters a");

  const chapters = [];
  for (let i = 0; i < rows.length; i++) {
    chapters.push({
      name: rows[i].children[0].data,
      link: "https://blogtruyen.vn" + rows[i].attribs.href,
    });
  }

  return chapters;
}

function parseAdditionalInfo($) {
  const description = $(".manga-detail .detail .content").text().trim();
  const alternativeNames = findNodeWithHeaderAndExtractNameFromText($, ".manga-detail .description p", "Tên khác:");
  const tags = extractTagsFromNode($, ".manga-detail .description .category");
  const authors = extractAuthorsFromNode($, ".manga-detail .description .color-green.label.label-info");
  return { description, alternativeNames, authors, tags };
}

async function parseManga(url) {
  const $ = await fetchAndLoad(url);

  return {
    name: $("title").text().split("|")[0].trim(),
    link: url,
    image: $(".thumbnail img").attr("src"),
    isCompleted: $(".description").text().includes("Đã hoàn thành"),
    chapters: await parseChapters($),
    ...parseAdditionalInfo($),
  };
}

const availableTags = [
  "16+",
  "18+",
  "action",
  "adult",
  "adventure",
  "anime",
  "bạo lực - máu me",
  "comedy",
  "comic",
  "doujinshi",
  "drama",
  "ecchi",
  "event bt",
  "fantasy",
  "full màu",
  "game",
  "gender bender",
  "harem",
  "historical",
  "horror",
  "isekai/dị giới/trọng sinh",
  "josei",
  "live action",
  "magic",
  "manga",
  "manhua",
  "manhwa",
  "martial arts",
  "mature",
  "mecha",
  "mystery",
  "nấu ăn",
  "ngôn tình",
  "ntr",
  "one shot",
  "psychological",
  "romance",
  "school life",
  "sci-fi",
  "seinen",
  "shoujo",
  "shoujo ai",
  "shounen",
  "shounen ai",
  "slice of life",
  "smut",
  "soft yaoi",
  "soft yuri",
  "sports",
  "supernatural",
  "tạp chí truyện tranh",
  "tragedy",
  "trap (crossdressing)",
  "trinh thám",
  "truyện scan",
  "tu chân - tu tiên",
  "video clip",
  "vncomic",
  "webtoon",
  "yuri",
  "truyện full",
];

export default {
  active: true,
  lang: "vi",
  site: "BlogTruyen",
  homepage: "https://blogtruyen.vn/",
  URLRegex,
  parseManga,
  parseChapters,
  parseAdditionalInfo,
  availableTags,
};
