const {
  fetchAndLoad,
  findNodeWithHeaderAndExtractNameFromText,
  findNodeWithHeaderAndExtractAuthorFromText,
  findNodeWithHeaderAndExtractTagsFromText,
} = require("../../scraping-service");

const URLRegex = /^https?:\/\/hocvientruyentranh\.(com|net)\/(index.php\/)?truyen\/[0-9]+\/.+$/;

async function parseChapters($) {
  const rows = $(".table-scroll .table-hover tr a");

  const chapters = [];
  for (let i = 0; i < rows.length; i++) {
    chapters.push({
      name: rows[i].attribs.title,
      link: rows[i].attribs.href,
    });
  }

  return chapters;
}

function extractDescription($) {
  let description = $(".__description").text().trim();
  if (description.endsWith("...")) {
    description = description.replace("...", "").trim();
  }
  return description;
}

function parseAdditionalInfo($) {
  let description = extractDescription($);
  const alternativeNames = findNodeWithHeaderAndExtractNameFromText($, ".__info p", "Tên khác:");
  const tags = findNodeWithHeaderAndExtractTagsFromText($, ".__info p", "Thể loại:");
  const authors = findNodeWithHeaderAndExtractAuthorFromText($, ".__info p", "Tác giả:");
  return { description, alternativeNames, authors, tags };
}

async function parseManga(url) {
  const $ = await fetchAndLoad(url);

  return {
    name: $("h3")[0].children[0].data,
    link: url,
    image: $(".__image img")[0].attribs.src,
    isCompleted: $(".__info p").text().includes("Đã hoàn thành"),
    chapters: await parseChapters($),
    ...parseAdditionalInfo($),
  };
}

const availableTags = [
  "4 Koma",
  "Action",
  "Adventure",
  "Chuyển sinh",
  "Comedy",
  "Comic",
  "Detective",
  "Doujinshi",
  "Doujinshi",
  "Drama",
  "Ecchi",
  "Fantasy",
  "Food",
  "Gender Bender",
  "Harem",
  "Historical",
  "Horror",
  "Isekai",
  "Josei",
  "Loli",
  "Martial Arts",
  "Mecha",
  "Medical",
  "Music",
  "Mystery",
  "On Tab",
  "One Shot",
  "Psycho",
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
  "Trưởng thành 17+",
  "Trưởng thành 18+",
  "Truyện Hàn (Manhwa)",
  "Truyện Nhật (Manga)",
  "Truyện Tàu (Manhua)",
  "Truyền Việt",
  "Webtoon",
  "Yaoi",
  "Yuri",
];

module.exports = {
  active: false,
  lang: "vi",
  site: "HocVienTruyenTranh",
  homepage: "https://hocvientruyentranh.net/",
  URLRegex,
  parseManga,
  parseChapters,
  parseAdditionalInfo,
  availableTags,
};
