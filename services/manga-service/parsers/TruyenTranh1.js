const normalizeDataSource = require("./utils").normalizeDataSource;

const URLRegex = /^https?:\/\/truyentranh1\.info\/TruyenTranh\/.+$/;

async function parseChapters(dataSource) {
  const $ = await normalizeDataSource(dataSource);

  const rows = $(".cellChapter a");

  const chapters = [];
  for (let i = 0; i < rows.length; i++) {
    chapters.push({
      name: rows[i].children[0].data,
      link: "http://truyentranh1.info" + rows[i].attribs.href,
    });
  }

  return chapters;
}

async function parseManga(dataSource) {
  const $ = await normalizeDataSource(dataSource);
  const aTag = $(".nameChapter a");

  return {
    name: aTag.attr("title"),
    link: "http://truyentranh1.info" + aTag.attr("href"),
    image: $(".cImage img").attr("src"),
    isCompleted: $(".info").text().includes("Full Bộ"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  source: "TruyenTranh1",
  URLRegex,
  parseManga,
  parseChapters,
};
