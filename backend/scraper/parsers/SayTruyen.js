const { fetchAndLoad } = require("./utils");

const URLRegex = /^https?:\/\/saytruyen\.com\/truyen-.+$/;

async function parseChapters($) {
  const rows = $(".chapter");

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
  const lastBreadcrumb = $(".breadcrumb li:last-child a");

  return {
    name: lastBreadcrumb.text().trim(),
    link: url,
    image: $('meta[property="og:image"]').attr("content"),
    isCompleted: $(".manga-info").text().includes("Hoàn thành"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  site: "SayTruyen",
  homepage: "https://saytruyen.com/",
  URLRegex,
  parseManga,
  parseChapters,
};
