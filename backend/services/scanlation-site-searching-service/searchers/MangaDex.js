import lodash from "lodash";

import { fetch } from "../../scraping-service.js";
import { OmnisearchScanlationMangaResult } from "../../../models/index.js";

const { uniq } = lodash;

function buildSearchURL(term, topN) {
  const searchParams = new URLSearchParams({
    title: term.trim(),
    limit: topN,
    "order[relevance]": "desc",
  });
  ["safe", "suggestive", "erotica"].forEach((cr) => searchParams.append("contentRating[]", cr));
  ["cover_art", "author", "artist"].forEach((i) => searchParams.append("includes[]", i));
  return `https://api.mangadex.org/manga?${searchParams}`;
}

function extractImage(rawManga) {
  const fileName = rawManga.relationships.find((rel) => rel.type === "cover_art").attributes.fileName;
  return `https://uploads.mangadex.org/covers/${rawManga.id}/${fileName}`;
}

function extractAuthors(rawManga) {
  return uniq(
    rawManga.relationships
      .filter((x) => x.type === "author" || x.type === "artist")
      .map((author) => author.attributes.name),
  );
}

async function requestChapters(rawManga) {
  const chapterAPIURL = `https://api.mangadex.org/chapter?manga=${rawManga.id}&translatedLanguage[]=en&limit=1&offset=0`;
  const response = await fetch(chapterAPIURL);
  return JSON.parse(response.body);
}

async function search(term, topN) {
  const url = buildSearchURL(term, topN);
  const response = await fetch(url);
  const { data } = JSON.parse(response.body);

  return Promise.all(
    data.map(async (rawManga) => {
      // TODO beware of rate limit
      const chapters = await requestChapters(rawManga);
      const lastChapter = chapters.data[0];
      const lastReleased = lastChapter ? lastChapter.attributes.publishAt : new Date().toISOString();
      const latestChapter = lastChapter
        ? {
            name: `Chap ${lastChapter.attributes.chapter} ${lastChapter.attributes.title}`,
            link: `https://mangadex.org/chapter/${lastChapter.id}/1`,
          }
        : {
            name: "No chap",
            link: "https://mangadex.org/",
          };

      return new OmnisearchScanlationMangaResult({
        site: "MangaDex",
        name: rawManga.attributes.title.en,
        link: `https://mangadex.org/title/${rawManga.id}/`,
        image: extractImage(rawManga),
        isCompleted: rawManga.attributes.status === "completed",
        authors: extractAuthors(rawManga),
        totalChapters: chapters.total,
        lastReleased,
        latestChapter,
      });
    }),
  );
}

export default {
  site: "MangaDex",
  search,
};
