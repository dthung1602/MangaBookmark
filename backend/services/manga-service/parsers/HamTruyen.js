const { fetchAndLoad } = require("./utils");

const URLRegex = /^https?:\/\/www.hamtruyen\.vn\/.+\.html$/;

async function parseChapters($) {
  const rows = $(".tenChapter a");

  const chapters = [];
  for (let i = 0; i < rows.length; i++) {
    chapters.push({
      name: rows[i].children[0].data,
      link: "https://hamtruyen.com" + rows[i].attribs.href,
    });
  }

  return chapters;
}

async function parseManga(url) {
  const $ = await fetchAndLoad(url);

  return {
    name: $('meta[property="og:title"]').attr("content"),
    link: $('meta[property="og:url"]').attr("content"),
    image: $("#content_truyen img").attr("src"),
    isCompleted: $(".icon_trangthai").parent().text().includes("Hoàn thành"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  site: "HamTruyen",
  homepage: "https://hamtruyen.vn/",
  URLRegex,
  parseManga,
  parseChapters,
};
