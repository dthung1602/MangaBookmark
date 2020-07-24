const { fetch } = require("./utils");

const URLRegex = /^https?:\/\/hocvientruyentranh\.(com|net)\/(index.php\/)?truyen\/[0-9]+\/.+$/;

async function parseChapters($) {
  const rows = $(".table-scroll .table-hover tr a");

  const chapters = [];
  for (let i = 0; i < rows.length; i++) {
    chapters.push({
      name: rows[i].attribs.title,
      link: rows[i].attribs.href,
    });
  }

  return chapters;
}

async function parseManga(url) {
  const $ = await fetch(url);

  return {
    name: $("h3")[0].children[0].data,
    link: $('meta[property="og:url"]').attr("content"),
    image: $(".__image img")[0].attribs.src,
    isCompleted: $(".__info p").text().includes("Đã hoàn thành"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  source: "HocVienTruyenTranh",
  URLRegex,
  parseManga,
  parseChapters,
};
