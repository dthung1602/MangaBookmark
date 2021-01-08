const { fetchAndLoad } = require("./utils");

const URLRegex = /^https?:\/\/www\.mangaread\.org\/manga\/.+$/;
const chaptersURL = "https://www.mangaread.org/wp-admin/admin-ajax.php";

async function parseChapters($) {
  const rows = $("a");

  const chapters = [];
  for (let i = 0; i < rows.length; i++) {
    chapters.push({
      name: rows[i].children[0].data.trim(),
      link: rows[i].attribs.href,
    });
  }

  return chapters;
}

async function parseManga(url) {
  const details = fetchAndLoad(url).then(($) => {
    $("h1 span").remove();
    return {
      name: $("h1").text(),
      link: url,
      image: $(".summary_image img").attr("src"),
      isCompleted: $(".post-status").text().includes("Completed"),
    };
  });

  const chapters = fetchAndLoad(chaptersURL, { referrer: url }).then(parseChapters);

  return {
    ...(await details),
    chapters: await chapters,
  };
}

module.exports = {
  lang: "en",
  site: "MangaRead",
  homepage: "https://www.mangaread.org",
  URLRegex,
  parseManga,
  parseChapters,
};
