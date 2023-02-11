import { fetch, extractNamesFromText } from "../../scraping-service.js";
import { protobuf } from "../../utils/index.js";

import schema from "./mangaplus.schema.js";

const URLRegex = /^https?:\/\/mangaplus\.shueisha\.co\.jp\/titles\/\d+/;
const BaseURL = "https://mangaplus.shueisha.co.jp";

function parseChapters(chapterListGroup) {
  return chapterListGroup.map((ch) => ({
    name: ch.chapterSubTitle,
    link: BaseURL + "/viewer/" + ch.chapterId,
  }));
}

function parseAdditionalInfo(data) {
  const description = data.response.data.overview.trim();
  const authors = extractNamesFromText(data.response.data.title.author, /\/|-| x /);
  return { description, authors };
}

function buildAPI(url) {
  const titleId = url.trim().replace(/\/$/, "").split("/").slice(-1)[0];
  return `https://jumpg-webapi.tokyo-cdn.com/api/title_detailV2?title_id=${titleId}`;
}

function mergeChapterListGroup(chapterListGroup) {
  const list = [];
  chapterListGroup.forEach((group) => {
    list.push(group.firstChapterList);
    list.push(group.midChapterList);
    list.push(group.lastChapterList);
  });
  return [].concat(...list.filter(Boolean)).reverse();
}

async function parseManga(url) {
  const res = await fetch(buildAPI(url));
  const proto = protobuf.decodeProto(res.rawBody);
  const data = protobuf.mapProtoToSchema(proto, schema);

  let { status, chapterListGroup } = data.response.data;
  chapterListGroup = mergeChapterListGroup(chapterListGroup);

  return {
    name: data.response.data.title.name.trim(),
    link: url,
    image: data.response.data.title.portraitImageUrl,
    isCompleted: status ? status.includes("completed") : false,
    chapters: parseChapters(chapterListGroup),
    ...parseAdditionalInfo(data),
  };
}

export default {
  active: true,
  lang: "en",
  site: "MangaPlus",
  homepage: "https://mangaplus.shueisha.co.jp/",
  URLRegex,
  parseManga,
  parseChapters,
  parseAdditionalInfo,
};
