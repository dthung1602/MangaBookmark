const { fetchAndLoad, extractAuthorsFromText } = require("../../scraping-service");
const { OmnisearchScanlationMangaResult } = require("../../../models");

function buildSearchURL(term) {
  term = term.trim().toLowerCase().replaceAll(" ", "_");
  return `https://mangakakalot.com/search/story/${term}`;
}

async function search(term, topN) {
  const url = buildSearchURL(term);
  const $ = await fetchAndLoad(url);

  return $(".panel_story_list .story_item")
    .map(function () {
      const mangaRootElement = $(this);
      const spans = mangaRootElement.find(".story_item_right > span");

      return new OmnisearchScanlationMangaResult({
        site: "Mangakakalot",
        name: mangaRootElement.find(".story_name").text(),
        link: mangaRootElement.find(".story_name a").attr("href"),
        image: mangaRootElement.find("img").attr("src"),
        authors: extractAuthorsFromText($(spans[0]).text(), ",", "Author(s) :"),
        lastReleased: $(spans[1]).text().replace("Updated :", "").replaceAll("-", " "),
        latestChapter: {
          name: $(mangaRootElement.find(".story_chapter")[0]).text(),
          link: mangaRootElement.find(".story_chapter a").attr("href"),
        },
      });
    })
    .toArray();
}

module.exports = {
  site: "Mangakakalot",
  search,
};
