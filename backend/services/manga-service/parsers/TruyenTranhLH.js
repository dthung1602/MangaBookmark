import {
  fetchAndLoad,
  extractTagsFromNode,
  findNodeWithHeaderAndExtractNameFromText,
  findNodeWithHeaderAndExtractAuthorFromText,
} from "../../scraping-service.js";

const URLRegex = /^https?:\/\/truyentranhlh\.net\/truyen-tranh\/.+$/;

const imageRegex = /background-image: url\('(.+)'\)/;

async function parseChapters($) {
  const links = $(".list-chapters a").toArray();
  const names = $(".list-chapters .chapter-name").toArray();

  const chapters = [];
  for (let i = 0; i < links.length; i++) {
    chapters.push({
      name: $(names[i]).text(),
      link: links[i].attribs.href.trim(),
    });
  }

  return chapters;
}

function parseAdditionalInfo($) {
  const description = $(".summary-content").text().trim();
  const alternativeNames = findNodeWithHeaderAndExtractNameFromText($, ".series-information .info-item", "Tên khác:");
  const authors = findNodeWithHeaderAndExtractAuthorFromText($, ".series-information .info-item", "Tác giả:");
  const tags = extractTagsFromNode($, ".series-information .info-item .badge-info");
  return { description, alternativeNames, authors, tags };
}

async function parseManga(url) {
  const $ = await fetchAndLoad(url);

  return {
    name: $(".series-name").text().trim(),
    link: url,
    image: $(".series-cover .content.img-in-ratio").attr("style").trim().match(imageRegex)[1],
    isCompleted: $(".series-information .info-value").text().includes("Đã hoàn thành"),
    chapters: await parseChapters($),
    ...parseAdditionalInfo($),
  };
}

const availableTags = [
  "Action",
  "Adult",
  "Adventure",
  "Anime",
  "Chuyển Sinh",
  "Cổ Đại",
  "Comedy",
  "Comic",
  "Demons",
  "Detective",
  "Doujinshi",
  "Drama",
  "Đam Mỹ",
  "Ecchi",
  "Fantasy",
  "Gender Bender",
  "Harem",
  "Historical",
  "Horror",
  "Huyền Huyễn",
  "Isekai",
  "Josei",
  "Mafia",
  "Magic",
  "Manhua",
  "Manhwa",
  "Martial Arts",
  "Mature",
  "Military",
  "Mystery",
  "Ngôn Tình",
  "One shot",
  "Psychological",
  "Romance",
  "School Life",
  "Sci-fi",
  "Seinen",
  "Shoujo",
  "Shoujo Ai",
  "Shounen",
  "Shounen Ai",
  "Slice of life",
  "Smut",
  "Sports",
  "Supernatural",
  "Tragedy",
  "Trọng Sinh",
  "Truyện Màu",
  "Webtoon",
  "Xuyên Không",
  "Yaoi",
  "Yuri",
  "Mecha",
  "Cooking",
  "Trùng Sinh",
];

export default {
  active: true,
  lang: "vi",
  site: "TruyenTranhLH",
  homepage: "https://truyentranhlh.net/",
  URLRegex,
  parseManga,
  parseChapters,
  parseAdditionalInfo,
  availableTags,
};
