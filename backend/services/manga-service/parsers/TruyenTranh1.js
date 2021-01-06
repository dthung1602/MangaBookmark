const { fetchAndLoad } = require("./utils");

const URLRegex = /^https?:\/\/truyentranh1\.info\/TruyenTranh\/.+$/;

async function parseChapters($) {
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

async function parseManga(url) {
  const $ = await fetchAndLoad(url);
  const aTag = $(".nameChapter a");

  return {
    name: aTag.attr("title"),
    link: url,
    image: $(".cImage img").attr("src"),
    isCompleted: $(".info").text().includes("Full Bộ"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  language: "vi",
  site: "TruyenTranh1",
  homepage: "http://truyentranh1.info/",
  URLRegex,
  parseManga,
  parseChapters,
};
