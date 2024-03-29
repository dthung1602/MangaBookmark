import { fetchAndLoad, filterNodeWithHeader, extractAuthorsFromText } from "../../scraping-service.js";
import { OmnisearchScanlationMangaResult } from "../../../models/index.js";

function buildSearchURL(term) {
  term = term.trim().toLowerCase().replaceAll(" ", "_");
  return `https://manganato.com/search/story/${term}`;
}

async function search(term) {
  const url = buildSearchURL(term);
  const $ = await fetchAndLoad(url);

  return $(".panel-search-story .search-story-item")
    .map(function () {
      const mangaRootElement = $(this);
      const release = filterNodeWithHeader($, mangaRootElement.find(".item-right > span"), "Updated");
      const lastChap = $(mangaRootElement.find("a.item-chapter")[0]);

      return new OmnisearchScanlationMangaResult({
        site: "Manganato",
        name: mangaRootElement.find("h3").text(),
        link: mangaRootElement.find("h3 a").attr("href"),
        image: mangaRootElement.find("img").attr("src"),
        authors: extractAuthorsFromText(mangaRootElement.find(".item-author").text(), ","),
        lastReleased: release.text().replace("Updated :", "").replaceAll("-", " "),
        latestChapter: {
          name: lastChap.text(),
          link: lastChap.attr("href"),
        },
      });
    })
    .toArray();
}

export default {
  site: "Manganato",
  search,
};
