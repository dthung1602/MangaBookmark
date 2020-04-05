const rq = require("request-promise");
const cheerio = require("cheerio");

const URLRegex = /^https?:\/\/hocvientruyentranh\.(com|net)\/(index.php\/)?truyen\/[0-9]+\/.+$/;

async function loadData(dataSource) {
  return cheerio.load(
    await rq({
      uri: dataSource,
      insecure: true, // to handle .net and .com
      rejectUnauthorized: false, // to handle .net and .com
    }),
  );
}

function normalizeDataSource(dataSource) {
  return typeof dataSource === "string" && dataSource.trim().startsWith("http")
    ? loadData(dataSource)
    : dataSource;
}

async function parseChapters(dataSource) {
  const $ = await normalizeDataSource(dataSource);

  const rows = $(".table-hover tr a");

  const chapters = [];
  for (let i = 0; i < rows.length; i++) {
    chapters.push({
      name: rows[i].attribs.title,
      link: rows[i].attribs.href,
    });
  }

  return chapters;
}

async function parseManga(dataSource) {
  const $ = await normalizeDataSource(dataSource);

  return {
    name: $("h3")[0].children[0].data,
    link: $('meta[property="og:url"]').attr("content"),
    image: $(".__image img")[0].attribs.src,
    isCompleted: $(".__info p").text().includes("Đã hoàn thành"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  URLRegex,
  loadData,
  parseManga,
  parseChapters,
};
