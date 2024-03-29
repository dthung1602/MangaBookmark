import { fetchAndLoad, fetch, load } from "../../scraping-service.js";
import { OmnisearchScanlationMangaResult } from "../../../models/index.js";

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

  return $("#main_homepage li")
    .map(function () {
      const mangaRootElement = $(this);
      return new OmnisearchScanlationMangaResult({
        site: "TruyenQQ",
        name: mangaRootElement.find("h3").text(),
        link: mangaRootElement.find("h3 a").attr("href"),
        image: mangaRootElement.find(".book_avatar img").attr("src"),
        isCompleted: mangaRootElement.find(".more-info").text().includes("Hoàn Thành"),
        latestChapter: {
          name: mangaRootElement.find(".last_chapter").text(),
          link: mangaRootElement.find(".last_chapter a").attr("href"),
        },
      });
    })
    .toArray();
}

export default {
  site: "TruyenQQ",
  search,
};
