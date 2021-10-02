const { fetchAndLoad } = require("./utils");

const URLRegex = /^https?:\/\/(www\.)?hamtruyen\.vn\/.+\.html$/;

async function parseChapters($) {
  const rows = $(".tenChapter a");

  const chapters = [];
  for (let i = 0; i < rows.length; i++) {
    chapters.push({
      name: rows[i].children[0].data,
      link: "https://hamtruyen.com" + rows[i].attribs.href,
    });
  }

  return chapters.reverse();
}

async function parseManga(url) {
  const $ = await fetchAndLoad(url);

  return {
    name: $('meta[property="og:title"]').attr("content"),
    link: url,
    image: $("#content_truyen img").attr("src"),
    isCompleted: $(".icon_trangthai").parent().text().includes("Hoàn thành"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  active: true,
  lang: "vi",
  site: "HamTruyen",
  homepage: "https://hamtruyen.vn/",
  URLRegex,
  parseManga,
  parseChapters,
};
