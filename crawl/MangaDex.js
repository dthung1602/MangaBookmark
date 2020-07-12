const { loadData, normalizeDataSource } = require("./utils");
const URLRegex = /^https?:\/\/mangadex\.org\/title\/[0-9]+\/.+$/;
const baseURL = "https://mangadex.org";

function getChapters($) {
  const rows = $(".chapter-container a.text-truncate");
  const isEnglish = $(".chapter-container .flag").map((i, e) => {
    return e.attribs.class.includes("flag-gb")
  });

  const chapters = [];
  for (let i = 0; i < rows.length; i++) {
    if (isEnglish[i]) {
      chapters.push({
        name: rows[i].children[0].data,
        link: baseURL + rows[i].attribs.href,
      });
    }
  }

  return chapters;
}

async function getNextPage($) {
  const nextPageLink = $('.page-item.active + .page-item a');
  const path = nextPageLink.attr('href');
  const nextPageBtnClass = nextPageLink.parent().attr('class');
  const isLast = nextPageBtnClass ? nextPageBtnClass.includes('disabled') : true;
  if (path && !isLast) {
    return await loadData(baseURL + path)
  }
}

async function parseChapters(dataSource) {
  let page = await normalizeDataSource(dataSource);
  let chapters = [];

  do {
    chapters = chapters.concat(getChapters(page));
    page = await getNextPage(page);
  } while (page);

  return chapters;
}

async function parseManga(dataSource) {
  const $ = await normalizeDataSource(dataSource);

  return {
    name: $("#content .card-header .mx-1").text().trim(),
    link: $("meta[property=\"og:url\"]").attr("content"),
    image: $("#content img")[0].attribs.src,
    isCompleted: $("#content .m-0:nth-child(9)").text().includes("Completed"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  source: "MangaDex",
  URLRegex,
  parseManga,
  parseChapters,
};
