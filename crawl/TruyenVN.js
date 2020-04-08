const normalizeDataSource = require("./utils").normalizeDataSource;

const URLRegex = /^https?:\/\/truyenvn\.com\/.+$/;

async function parseChapters(dataSource) {
  const $ = await normalizeDataSource(dataSource);

  const links = $("#chapterList a");
  const names = $("#chapterList span:first-child");

  const chapters = [];
  for (let i = 0; i < links.length; i++) {
    chapters.push({
      name: names[i].children[0].data,
      link: links[i].attribs.href,
    });
  }

  return chapters;
}

async function parseManga(dataSource) {
  const $ = await normalizeDataSource(dataSource);

  return {
    name: $(".info .name").text(),
    link: $('meta[property="og:url"]').attr("content"),
    image: $(".comic-info picture img").attr("data-src"),
    isCompleted: $(".meta-data").text().includes("Hoàn Thành"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  URLRegex,
  parseManga,
  parseChapters,
};
