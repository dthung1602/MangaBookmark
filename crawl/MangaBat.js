const normalizeDataSource = require("./utils").normalizeDataSource;

const URLRegex = /^https?:\/\/mangabat\.com\/manga\/.+$/;

async function parseChapters(dataSource) {
  const $ = await normalizeDataSource(dataSource);

  const rows = $("#list_chapter a");

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
    name: $("h1").text(),
    link: $('meta[property="og:url"]').attr("content"),
    image: $(".info_image_manga")[0].attribs.src,
    isCompleted: $(".truyen_info_right").text().includes("Completed"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  URLRegex,
  parseManga,
  parseChapters,
};
