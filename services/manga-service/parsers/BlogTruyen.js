const { fetch } = require("./utils");

const URLRegex = /^https?:\/\/blogtruyen\.vn\/[0-9]+\/.+/;

async function parseChapters($) {
  const rows = $("#list-chapters a");

  const chapters = [];
  for (let i = 0; i < rows.length; i++) {
    chapters.push({
      name: rows[i].children[0].data,
      link: "https://blogtruyen.vn/" + rows[i].attribs.href,
    });
  }

  return chapters;
}

async function parseManga(url) {
  const $ = await fetch(url);

  return {
    name: $("title").text().split("|")[0].trim(),
    link: $('meta[property="og:url"]').attr("content"),
    image: $(".thumbnail img").attr("src"),
    isCompleted: $(".description").text().includes("Đã hoàn thành"),
    chapters: await parseChapters($),
  };
}

module.exports = {
  source: "BlogTruyen",
  URLRegex,
  parseManga,
  parseChapters,
};
