const { fetchAndLoad, extractNamesFromText, extractTagsFromText, extractAuthorsFromText } = require("./utils");

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

function extractDescription($) {
  let description = $(".__description").text().trim();
  if (description.endsWith("...")) {
    description = description.replace("...", "").trim();
  }
  return description;
}

function parseAdditionalInfo($) {
  const info = $(".__info p");
  let description = extractDescription($);
  const alternativeNames = extractNamesFromText($(info[0]).text(), ";", "Tên khác:");
  const tags = extractTagsFromText($(info[1]).text(), ",", "Thể loại:");
  const authors = extractAuthorsFromText($(info[2]).text(), ",", "Tác giả:");
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
  parseAdditionalInfo,
};
