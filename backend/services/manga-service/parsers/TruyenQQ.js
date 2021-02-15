const { fetchAndLoad, extractNamesFromText, extractTagsFromNode, extractAuthorsFromText } = require("./utils");

const URLRegex = /^https?:\/\/truyenqq\.com\/truyen-tranh\/.+$/;

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
  const alternativeNames = extractNamesFromText($(".txt .info-item:contains('Tên Khác')").text(), ";", "Tên Khác:");
  const tags = extractTagsFromNode($, $(".list01 a"));
  const authors = extractAuthorsFromText($(".txt .info-item:contains('Tác giả')").text(), ",", "Tác giả:");
  return { description, alternativeNames, authors, tags };
}

async function parseManga(url) {
  const $ = await fetchAndLoad(url);

  return {
    name: $("h1").text().trim(),
    link: url,
    image: JSON.parse($('script[type="application/ld+json"]')[0].children[0].data).image.url.trim(),
    isCompleted: $(".block01 .txt").text().includes("Hoàn Thành"),
    chapters: await parseChapters($),
    ...parseAdditionalInfo($),
  };
}

module.exports = {
  active: true,
  lang: "vi",
  site: "TruyenQQ",
  homepage: "http://truyenqq.com/",
  URLRegex,
  parseManga,
  parseChapters,
  parseAdditionalInfo,
};
