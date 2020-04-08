const normalizeDataSource = require("./utils").normalizeDataSource;

const URLRegex = /^https?:\/\/mangaowl\.net\/single\/[0-9]+\/.+$/;

async function parseChapters(dataSource) {
  const $ = await normalizeDataSource(dataSource);

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

async function parseManga(dataSource) {
  const $ = await normalizeDataSource(dataSource);

  return {
    name: $("h2").text().trim(),
    link: $("[rel=amphtml]").attr("href").replace("-amp", ""),
    image: $(".single_detail img").attr("data-src"),
    isCompleted: $(".single_detail .fexi_header_para").text().includes("Completed"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  URLRegex,
  parseManga,
  parseChapters,
};
