const { fetchAndLoad } = require("../../scraping-service");
const got = require("got");
const URLRegex = /^https?:\/\/mangapark\.net\/title\/.+$/;
const baseURL = "https://mangapark.net";

const query = `
query get_content_comicChapterRangeList(
  $select: Content_ComicChapterRangeList_Select
) {
  get_content_comicChapterRangeList(select: $select) {
    pager {
      x
      y
    }
    items {
      chapterNodes {
        data {
          lang
          title
          urlPath
        }
      }
    }
  }
}
`;

function getGQLBody(comicId, range = null) {
  return {
    operationName: "get_content_comicChapterRangeList",
    query: query,
    variables: {
      select: {
        comicId: comicId,
        isAsc: false,
        range: range,
      },
    },
  };
}

function comicIdFromUrl(url) {
  if (url.endsWith("/")) {
    url = url.slice(0, url.length - 1);
  }
  return url.split("/").pop().split("_")[0];
}

async function parseChapters(url) {
  const res = await got
    .post("https://mangapark.net/apo/", {
      json: getGQLBody(comicIdFromUrl(url)),
    })
    .json();
  let { pager, items } = res.data.get_content_comicChapterRangeList;
  pager = pager.slice(1);

  const additional = await Promise.all(
    pager.map((range) =>
      got
        .post("https://mangapark.net/apo/", {
          json: getGQLBody(comicIdFromUrl(url), range),
        })
        .json(),
    ),
  );
  additional
    .map((res) => res.data.get_content_comicChapterRangeList.items)
    .forEach((moreItems) => (items = [...items, ...moreItems]));

  return items
    .map((chap) => chap.chapterNodes.filter((n) => n.data.lang === "en")[0])
    .filter(Boolean)
    .map((chap) => ({
      name: chap.data.title,
      link: baseURL + chap.data.urlPath,
    }));
}

async function parseManga(url) {
  const $ = await fetchAndLoad(url);

  return {
    name: $("main .text-2xl.font-bold a").text(),
    link: url,
    image: $("main img.w-full").attr("src"),
    isCompleted: $("[status='completed']").length >= 1,
    chapters: await parseChapters(url),
  };
}

module.exports = {
  active: true,
  lang: "en",
  site: "MangaPark",
  homepage: "https://mangapark.net/",
  URLRegex,
  parseManga,
  parseChapters,
};
