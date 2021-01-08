const { fetchAndLoad } = require("./utils");

const URLRegex = /^https?:\/\/www\.medoctruyentranh\.net\/truyen-tranh\/.+-[0-9]+$/;

async function parseChapters($) {
  const rows = $(".chapter_pages a");

  const chapters = [];
  for (let i = rows.length - 1; i >= 0; i--) {
    chapters.push({
      name: rows[i].attribs.alt,
      link: rows[i].attribs.href,
    });
  }

  return chapters;
}

async function parseManga(url) {
  const $ = await fetchAndLoad(url);

  return {
    name: $(".title").text(),
    link: url,
    image: $(".detail_info img").attr("src"),
    isCompleted: $(".other_infos").text().includes("Đã kết thúc"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  lang: "vi",
  site: "MeDocTruyenTranh",
  homepage: "https://www.medoctruyentranh.net/",
  URLRegex,
  parseManga,
  parseChapters,
};
