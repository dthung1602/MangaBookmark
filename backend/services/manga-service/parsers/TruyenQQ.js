const {
  load,
  fetch,
  fetchAndLoad,
  extractNamesFromText,
  extractTagsFromNode,
  extractAuthorsFromText,
} = require("../../scraping-service");

const URLRegex = /^https?:\/\/truyenqq(top|vip|pro)\.com\/truyen-tranh\/.+$/;

async function parseChapters($) {
  const rows = $(".works-chapter-list a");

  const chapters = [];
  for (let i = 0; i < rows.length; i++) {
    chapters.push({
      name: rows[i].children[0].data.trim(),
      link: rows[i].attribs.href.trim(),
    });
  }

  return chapters;
}

function parseAdditionalInfo($) {
  let description = $('div[itemprop="description"]').text().trim();
  const alternativeNames = extractNamesFromText($(".txt .othername h2").text(), ";", "Tên Khác:");
  const tags = extractTagsFromNode($, $(".list01 a"));
  const authors = extractAuthorsFromText($(".txt .author a").text(), ",", "Tác giả:");
  return { description, alternativeNames, authors, tags };
}

const cookieRegex = /"VinaHost-Shield=([0-9a-f]+)"/;

const headers = {
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:92.0) Gecko/20100101 Firefox/92.0",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "Accept-Language": "en",
  Host: "truyenqqpro.com",
  Referer: "http://truyenqqpro.com/",
  DNT: "1",
  Connection: "keep-alive",
};

async function byPassCookieGuard(url) {
  const response = await fetch(url, headers);
  const match = response.body.match(cookieRegex);

  if (!match) {
    return load(url, response);
  }

  const cookie = `VinaHost-Shield=${match[1]}`;

  return fetchAndLoad(url, {
    ...headers,
    Pragma: "no-cache",
    "Cache-Control": "no-cache",
    Referer: url,
    Cookie: cookie,
  });
}

async function parseManga(url) {
  url = url.replace("truyenqqtop", "truyenqqpro");
  url = url.replace("truyenqqvip", "truyenqqpro");

  const $ = await byPassCookieGuard(url);

  return {
    name: $("h1").text().trim(),
    link: url,
    image: $(".book_avatar img").attr("src"),
    isCompleted: $(".txt .status h2").text().includes("Hoàn Thành"),
    chapters: await parseChapters($),
    ...parseAdditionalInfo($),
  };
}

module.exports = {
  active: true,
  lang: "vi",
  site: "TruyenQQ",
  homepage: "http://truyenqqpro.com/",
  URLRegex,
  parseManga,
  parseChapters,
  parseAdditionalInfo,
};
