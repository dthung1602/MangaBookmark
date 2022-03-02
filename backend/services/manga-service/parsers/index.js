const fs = require("fs");
const { isString, uniqBy, uniq } = require("lodash");

const { MangaSiteRedirectedException } = require("../../scraping-service");

const parsers = [];
const parserRegexMapping = {};
let supportedSites = [];
let availableTags = [];

const excludedFiles = new Set(["utils", "index"]);

fs.readdirSync(__dirname)
  .map((file) => file.replace(".js", ""))
  .filter((file) => !excludedFiles.has(file))
  .forEach((file) => {
    const parserModule = require("./" + file);
    supportedSites.push({
      name: file,
      homepage: parserModule.homepage,
      lang: parserModule.lang,
      active: parserModule.active,
    });
    availableTags = availableTags.concat(parserModule.availableTags);
    parsers.push(parserModule);
    parserRegexMapping[file] = parserModule.URLRegex;
  });

supportedSites = supportedSites.sort((a, b) => a.name.localeCompare(b.name));
availableTags = Array.from(new Set(availableTags.filter(isString).map((t) => t.trim().toLowerCase())))
  .filter(Boolean)
  .sort((a, b) => a.localeCompare(b));

function getParser(url) {
  for (let i = 0; i < parsers.length; i++) {
    if (url.match(parsers[i].URLRegex)) {
      if (!parsers[i].active) {
        throw new Error("Site no longer active");
      }
      return parsers[i];
    }
  }
  throw new Error("Unsupported manga site");
}

function getSiteByName(name) {
  return supportedSites.find((site) => site.name === name);
}

async function parseManga(url, parser = null) {
  parser = parser || getParser(url);
  let manga;
  try {
    manga = await parser.parseManga(url);
    postProcessManga(manga);
  } catch (e) {
    if (e instanceof MangaSiteRedirectedException) {
      parser = getParser(e.newUrl);
      manga = await parser.parseManga(e.newUrl);
    } else {
      throw e;
    }
  }
  return {
    manga,
    usedParser: parser,
  };
}

function postProcessManga(manga) {
  for (let field of ["name", "link", "image"]) {
    manga[field] = manga[field].trim();
  }
  manga.chapters.forEach((chapter) => {
    chapter.name = chapter.name.trim();
    chapter.link = chapter.link.trim();
  });
  manga.chapters = uniqBy(manga.chapters, (ch) => ch.link);
  if (manga.description) {
    manga.description = manga.description.trim();
  }
  if (manga.alternativeNames) {
    manga.alternativeNames = uniq(manga.alternativeNames.map((n) => n.trim()));
  }
  if (manga.tags) {
    manga.tags = uniq(manga.tags.map((t) => t.trim().toLowerCase()));
  }
  if (manga.authors) {
    manga.authors = uniq(manga.authors.map((a) => a.trim()));
  }
}

module.exports = {
  parsers,
  supportedSites,
  availableTags,
  parserRegexMapping,
  getParser,
  getSiteByName,
  parseManga,
};
