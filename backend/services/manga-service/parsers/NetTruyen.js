const { fetchAndLoad, extractAuthorsFromNode, extractTagsFromNode, extractNamesFromText } = require("./utils");

const URLRegex = /^https?:\/\/www\.nettruyenpro\.com\/truyen-tranh\/.+$/;

async function parseChapters($) {
  const rows = $("nav .chapter a");

  const chapters = [];
  for (let i = 0; i < rows.length; i++) {
    chapters.push({
      name: rows[i].children[0].data,
      link: rows[i].attribs.href,
    });
  }

  return chapters;
}

function parseAdditionalInfo($) {
  const description = $(".detail-content p").text();
  const alternativeNames = extractNamesFromText($(".other-name").text());
  const tags = extractTagsFromNode($, $(".kind a"));
  const authors = extractAuthorsFromNode($, $(".author a"));
  return { description, alternativeNames, authors, tags };
}

async function parseManga(url) {
  const $ = await fetchAndLoad(url);

  return {
    name: $("h1").text(),
    link: url,
    image: $(".detail-info img")[0].attribs.src,
    isCompleted: $(".status p:last-child").text() === "Hoàn thành",
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
  "Comedy",
  "Comic",
  "Cooking",
  "Cổ Đại",
  "Doujinshi",
  "Drama",
  "Đam Mỹ",
  "Ecchi",
  "Fantasy",
  "Gender Bender",
  "Harem",
  "Historical",
  "Horror",
  "Josei",
  "Live action",
  "Manga",
  "Manhua",
  "Manhwa",
  "Martial Arts",
  "Mature",
  "Mecha",
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
  "Slice of Life",
  "Smut",
  "Soft Yaoi",
  "Soft Yuri",
  "Sports",
  "Supernatural",
  "Tạp chí truyện tranh",
  "Thiếu Nhi",
  "Tragedy",
  "Trinh Thám",
  "Truyện scan",
  "Truyện Màu",
  "Việt Nam",
  "Webtoon",
  "Xuyên Không",
  "16+",
];

module.exports = {
  active: true,
  lang: "vi",
  site: "NetTruyen",
  homepage: "http://www.nettruyenpro.com/",
  URLRegex,
  parseManga,
  parseChapters,
  parseAdditionalInfo,
  availableTags,
};
