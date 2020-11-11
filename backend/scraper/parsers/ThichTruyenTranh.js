const { fetchAndLoad } = require("./utils");

const URLRegex = /^https?:\/\/thichtruyentranh\.com\/.+\/[0-9]+\.html$/;

async function parseChapters($) {
  const rows = $("#listChapterBlock a");

  const chapters = [];
  for (let i = 1; i < rows.length; i++) {
    chapters.push({
      name: rows[i].children[0].data,
      link: "https://thichtruyentranh.com" + rows[i].attribs.href,
    });
  }

  return chapters.reverse();
}

async function parseManga(url) {
  const $ = await fetchAndLoad(url);

  return {
    name: $("h1")[1].children[0].data,
    link: url,
    image: $(".divthum2 img").attr("src"),
    isCompleted: $(".ullist_item").text().includes("FULL"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  site: "ThichTruyenTranh",
  homepage: "https://thichtruyentranh.com/",
  URLRegex,
  parseManga,
  parseChapters,
};
