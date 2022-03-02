const { fetchAndLoad, extractAuthorsFromNode } = require("../../scraping-service");
const { OmnisearchScanlationMangaResult } = require("../../../models");

function buildSearchURL(term, page) {
  const searchParams = new URLSearchParams({
    title: term,
    page,
  });
  return `http://fanfox.net/search?${searchParams}`;
}

function extractMangaFromPage($) {
  return $("ul.manga-list-4-list li")
    .map(function () {
      const mangaRootElement = $(this);
      const manga$ = mangaRootElement.find.bind(mangaRootElement);

      return new OmnisearchScanlationMangaResult({
        site: "FanFox",
        name: manga$(".manga-list-4-item-title").text(),
        link: "http://fanfox.net" + manga$("> a").attr("href"),
        image: manga$("img").attr("src"),
        isCompleted: manga$(".manga-list-4-show-tag-list-2").text().includes("Completed"),
        authors: extractAuthorsFromNode(manga$, ".manga-list-4-item-tip a.blue"),
        latestChapter: {
          name: manga$(".manga-list-4-item-tip a").text(),
          link: "http://fanfox.net" + manga$(".manga-list-4-item-tip a").attr("href"),
        },
      });
    })
    .toArray();
}

const MANGAS_PER_PAGE = 12;

async function search(term, topN) {
  let finalResult = [];

  for (let page = 1; page <= Math.ceil(topN / MANGAS_PER_PAGE); page++) {
    const url = buildSearchURL(term, page);
    const $ = await fetchAndLoad(url);
    const tmpResult = extractMangaFromPage($);
    finalResult = finalResult.concat(tmpResult);
  }

  return finalResult;
}

module.exports = {
  site: "FanFox",
  search,
};
