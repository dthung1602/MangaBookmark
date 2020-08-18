const { fetchAndLoad } = require("./utils");

const URLRegex = /^https?:\/\/www\.nettruyen\.com\/truyen-tranh\/.+$/;

async function parseChapters($) {
  const rows = $("nav .chapter a");

  const chapters = [];
  for (let i = 0; i < rows.length; i++) {
    chapters.push({
      name: rows[i].children[0].data,
      link: rows[i].attribs.href,
    });
  }

  return chapters;
}

async function parseManga(url) {
  const $ = await fetchAndLoad(url);

  return {
    name: $("h1").text(),
    link: $('meta[property="og:url"]').attr("content"),
    image: $(".detail-info img")[0].attribs.src,
    isCompleted: $(".status p:last-child").text() === "Hoàn thành",
    chapters: await parseChapters($),
  };
}

module.exports = {
  site: "NetTruyen",
  homepage: "http://www.nettruyen.com/",
  URLRegex,
  parseManga,
  parseChapters,
};
