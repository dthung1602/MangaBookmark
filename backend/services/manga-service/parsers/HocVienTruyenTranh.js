const { startCase } = require("lodash");

const { fetchAndLoad } = require("./utils");

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

function parseAdditionalInfo($) {
  const info = $(".__info p");
  let description = $(".__description").text().trim();
  if (description.endsWith("...")) {
    description = description.replace("...", "").trim();
  }
  const alternativeNames = $(info[0])
    .text()
    .replace("Tên khác:", "")
    .split(";")
    .map((name) => name.trim());
  const tags = $(info[1])
    .text()
    .replace("Thể loại:", "")
    .split(",")
    .map((tag) => tag.trim().toLowerCase());
  const authors = $(info[2]).text().replace("Tác giả:", "").split(",").map(startCase);
  return { description, alternativeNames, authors, tags };
}

async function parseManga(url) {
  const $ = await fetchAndLoad(url);

  return {
    name: $("h3")[0].children[0].data,
    link: url,
    image: $(".__image img")[0].attribs.src,
    isCompleted: $(".__info p").text().includes("Đã hoàn thành"),
    chapters: await parseChapters($),
    ...parseAdditionalInfo($),
  };
}

module.exports = {
  lang: "vi",
  site: "HocVienTruyenTranh",
  homepage: "https://hocvientruyentranh.net/",
  URLRegex,
  parseManga,
  parseChapters,
};
