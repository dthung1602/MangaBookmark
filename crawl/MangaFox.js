const normalizeDataSource = require("./utils").normalizeDataSource;

const URLRegex = /^https?:\/\/ww3\.mangafox\.online\/.+$/;

async function parseChapters(dataSource) {
  const $ = await normalizeDataSource(dataSource);

  const rows = $(".chapter_number a");

  const chapters = [];
  for (let i = 0; i < rows.length; i++) {
    chapters.push({
      name: rows[i].children[0].data,
      link: rows[i].attribs.href,
    });
  }

  return chapters;
}

async function parseManga(dataSource) {
  const $ = await normalizeDataSource(dataSource);

  return {
    name: $(".manga_name h1").text(),
    link: $('meta[property="og:url"]').attr("content"),
    image: $(".manga_info_img img").attr("src"),
    isCompleted: false, // info not available
    chapters: await parseChapters($),
  };
}

module.exports = {
  source: "MangaFox",
  URLRegex,
  parseManga,
  parseChapters,
};
