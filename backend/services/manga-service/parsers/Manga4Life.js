const { fetchAndLoad } = require("./utils");

const URLRegex = /^https?:\/\/manga4life\.com\/manga\/.+$/;

const chapterRegex = /vm.Chapters = (.*);/;

const chapterURLEncode = function (e) {
  let Index = "";
  const t = e.substring(0, 1);
  1 != t && (Index = "-index-" + t);
  let n = parseInt(e.slice(1, -1)),
    m = "",
    a = e[e.length - 1];
  return 0 != a && (m = "." + a), "-chapter-" + n + m + Index + ".html";
};

const chapterDisplay = function (e) {
  const t = parseInt(e.slice(1, -1)),
    n = e[e.length - 1];
  return 0 == n ? t : t + "." + n;
};

async function parseChapters($) {
  let urlParts = $("meta[property='og:url']").attr("content").split("/");
  let mangaSlug = urlParts.pop();
  if (!mangaSlug) {
    mangaSlug = urlParts.pop();
  }
  const baseChapterURL = "https://manga4life.com/read-online/" + mangaSlug;

  let rawChapters = [];
  $("script").each(function () {
    const text = this.children[0]?.data || "";
    const match = text.match(chapterRegex);
    if (match) {
      rawChapters = JSON.parse(match[1]);
    }
  });

  const chapters = [];
  for (let chapter of rawChapters) {
    chapters.push({
      name: (chapter.Type !== "" ? chapter.Type : "Chapter") + " " + chapterDisplay(chapter.Chapter),
      link: baseChapterURL + chapterURLEncode(chapter.Chapter),
    });
  }

  return chapters;
}

async function parseManga(url) {
  const $ = await fetchAndLoad(url);

  return {
    name: $("h1").text(),
    link: url,
    image: $("img.img-fluid.bottom-5").attr("src"),
    isCompleted: $(".list-group.list-group-flush").text().includes("Complete (Scan)"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  active: true,
  lang: "en",
  site: "Manga4Life",
  homepage: "https://manga4life.com",
  URLRegex,
  parseManga,
  parseChapters,
};
