const { fetch } = require("../../scraping-service");
const { OmnisearchScanlationMangaResult } = require("../../../models");

function buildSearchURL(term) {
  const searchParams = new URLSearchParams({ sort: "s", desc: "false", name: term });
  return `https://manga4life.com/search/?${searchParams.toString()}`;
}

function selectMatchingMagna(response, term, topN) {
  // TODO rank mangas by relevance before slicing
  term = term.toLowerCase();
  const allMangas = JSON.parse(response.body.match(/Directory = (.+?);\r\n/)[1]);
  return allMangas
    .filter((manga) => {
      if (manga.s.toLowerCase().includes(term)) {
        return true;
      }
      return manga.al.some((alternativeName) => alternativeName.toLowerCase().includes(term));
    })
    .slice(0, topN);
}

/**
 * Copied from manga4life FE
 * Example: e = 100050
 * index = 1
 * chapter = 5
 * odd = 0
 */
function ChapterChop(e, r) {
  if ("Index" == r) {
    var n = e.substring(0, 1);
    return 1 == n ? "" : "-index-" + n;
  }
  if ("Chapter" == r) {
    return parseInt(e.substring(1, 5), 10);
  }
  if ("Odd" == r) {
    var a = e.substring(5, 6);
    return 0 == a ? "" : "." + a;
  }
}

async function search(term, topN) {
  const url = buildSearchURL(term);
  const response = await fetch(url);
  const matchingMangas = selectMatchingMagna(response, term, topN);
  return matchingMangas.map(
    (rawManga) =>
      new OmnisearchScanlationMangaResult({
        site: "Manga4Life",
        _id: rawManga.i,
        name: rawManga.s,
        image: `https://cover.nep.li/cover/${rawManga.i}.jpg`,
        isCompleted: rawManga.ss === "Complete",
        authors: rawManga.a,
        lastReleased: rawManga.ls.replace("+00:00", "Z"),
        latestChapter: {
          name: `Chapter ${ChapterChop(rawManga.l, "Chapter")}${ChapterChop(rawManga.l, "Odd")}`,
          link:
            "https://manga4life.com/read-online/" +
            rawManga.i +
            "-chapter-" +
            ChapterChop(rawManga.l, "Chapter") +
            ChapterChop(rawManga.l, "Odd") +
            ChapterChop(rawManga.l, "Index") +
            ".html",
        },
      }),
  );
}

module.exports = {
  site: "Manga4Life",
  search,
};
