const rq = require("request-promise");
const cheerio = require("cheerio");
const { USER_AGENT } = require("../config");
const URLRegex = /^https?:\/\/truyenqq\.com\/truyen-tranh\/.+$/;
const cookieRegex = /document.cookie="(VinaHost-Shield=.*)"\+"/;

async function request(dataSource, cookie = "") {
  return await rq({
    uri: dataSource,
    insecure: true,
    rejectUnauthorized: false,
    headers: {
      "User-Agent": USER_AGENT,
      "Accept-Language": "en",
      Cookie: cookie,
    },
  });
}

async function loadData(dataSource) {
  let response = await request(dataSource);
  const match = response.match(cookieRegex);
  if (match) {
    const cookie = match[1] + "; path=/";
    response = await request(dataSource, cookie);
  }
  return cheerio.load(response);
}

function normalizeDataSource(dataSource) {
  return typeof dataSource === "string" && dataSource.trim().startsWith("http") ? loadData(dataSource) : dataSource;
}

async function parseChapters(dataSource) {
  const $ = await normalizeDataSource(dataSource);

  const rows = $(".works-chapter-list a");

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
    image: $(".block01 .left img")[0].attribs.src,
    isCompleted: $(".block01 .txt").text().includes("Hoàn Thành"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  source: "TruyenQQ",
  URLRegex,
  parseManga,
  parseChapters,
};
