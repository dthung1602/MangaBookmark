const { fetchAndLoad } = require("./utils");

const URLRegex = /^https?:\/\/mangaowl\.net\/single\/[0-9]+\/.+$/;

async function parseChapters($) {
  const rows = $(".chapter-url");

  const chapters = [];
  for (let i = 0; i < rows.length; i++) {
    chapters.push({
      name: $(rows[0]).find("label").text().trim().split("\n")[0],
      link: rows[i].attribs.href,
    });
  }

  return chapters;
}

async function parseManga(url) {
  const $ = await fetchAndLoad(url);

  return {
    name: $("h2").text().trim(),
    link: url,
    image: $(".single_detail img").attr("data-src"),
    isCompleted: $(".single_detail .fexi_header_para").text().includes("Completed"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  active: true,
  lang: "en",
  site: "MangaOwl",
  homepage: "https://mangaowl.net/",
  URLRegex,
  parseManga,
  parseChapters,
};
