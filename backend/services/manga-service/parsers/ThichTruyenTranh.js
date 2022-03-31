const { fetchAndLoad } = require("../../scraping-service");

const URLRegex = /^https?:\/\/thichtruyentranh\.com\/.+\/[0-9]+\.html$/;

function extractName($) {
  return $("h1")[1].children[0].data;
}

async function parseChapters($) {
  const rows = $("#listChapterBlock .ul_listchap a");
  const prefix = extractName($);

  const chapters = [];
  for (let i = 0; i < rows.length; i++) {
    let name = rows[i].children[0].data.replace(prefix, "").trim();
    if (name.startsWith("-")) {
      name = name.slice(1);
    }
    chapters.push({
      name,
      link: "https://thichtruyentranh.com" + rows[i].attribs.href,
    });
  }

  return chapters.reverse();
}

async function parseManga(url) {
  const $ = await fetchAndLoad(url);

  return {
    name: extractName($),
    link: url,
    image: $(".divthum2 img").attr("src"),
    isCompleted: $(".ullist_item").text().includes("FULL"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  active: true,
  lang: "vi",
  site: "ThichTruyenTranh",
  homepage: "https://thichtruyentranh.com/",
  URLRegex,
  parseManga,
  parseChapters,
};
