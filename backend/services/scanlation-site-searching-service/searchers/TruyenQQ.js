const { fetchAndLoad, fetch, load } = require("../../scraping-service");
const { OmnisearchScanlationMangaResult } = require("../../../models");

function buildSearchURL(term) {
  const searchParams = new URLSearchParams({
    q: term,
  });
  return `http://truyenqqpro.com/tim-kiem.html?${searchParams}`;
}

// TODO refactor this
const cookieRegex = /"VinaHost-Shield=([0-9a-f]+)"/;

const headers = {
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:92.0) Gecko/20100101 Firefox/92.0",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "Accept-Language": "en",
  Host: "truyenqqpro.com",
  Referer: "http://truyenqqpro.com/",
  DNT: "1",
  Connection: "keep-alive",
};

async function byPassCookieGuard(url) {
  const response = await fetch(url, headers);
  const match = response.body.match(cookieRegex);

  if (!match) {
    return load(url, response);
  }

  const cookie = `VinaHost-Shield=${match[1]}`;

  return fetchAndLoad(url, {
    ...headers,
    Pragma: "no-cache",
    "Cache-Control": "no-cache",
    Referer: url,
    Cookie: cookie,
  });
}

async function search(term) {
  const url = buildSearchURL(term);

  const $ = await byPassCookieGuard(url);

  return $(".story-list .story-item")
    .map(function () {
      const mangaRootElement = $(this);

      return new OmnisearchScanlationMangaResult({
        site: "TruyenQQ",
        name: mangaRootElement.find(".title-book").text(),
        link: mangaRootElement.find(".title-book a").attr("href"),
        image: mangaRootElement.find("img").attr("src"),
        latestChapter: {
          name: mangaRootElement.find(".episode-book").text(),
          link: mangaRootElement.find(".episode-book a").attr("href"),
        },
      });
    })
    .toArray();
}

module.exports = {
  site: "TruyenQQ",
  search,
};
