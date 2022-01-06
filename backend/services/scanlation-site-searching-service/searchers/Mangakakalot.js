const { fetchAndLoad, extractAuthorsFromText } = require("../../scraping-service");
const { OmnisearchScanlationMangaResult } = require("../../../models");

function buildSearchURL(term) {
  term = term.trim().toLowerCase().replaceAll(" ", "_");
  return `https://mangakakalot.com/search/story/${term}`;
}

function parseLastReleased(text) {
  text = text.trim().replace("Updated :", "").replaceAll("-", " ").trim();
  return new Date(Date.parse(text)).toISOString();
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
        name: mangaRootElement.find(".story_name").text().trim(), // TODO move normalize logic out
        link: mangaRootElement.find(".story_name a").attr("href").trim(),
        image: mangaRootElement.find("img").attr("src").trim(),
        authors: extractAuthorsFromText($(spans[0]).text(), ",", "Author(s) :"),
        lastReleased: parseLastReleased($(spans[1]).text()),
        latestChapter: {
          name: $(mangaRootElement.find(".story_chapter")[0]).text().trim(),
          link: mangaRootElement.find(".story_chapter a").attr("href").trim(),
        },
      });
    })
    .toArray()
    .slice(0, topN);
}

module.exports = {
  site: "Mangakakalot",
  search,
};
