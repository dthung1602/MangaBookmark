import { fetch, extractNamesFromText } from "../../scraping-service.js";
import { protobuf } from "../../utils/index.js";
import { v1 as uuidV1 } from "uuid";
import schema from "./mangaplus.schema.js";
import fs from "fs";

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
  return `https://jumpg-webapi.tokyo-cdn.com/api/title_detailV4?title_id=${titleId}&clang=eng`;
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

let globalHeader = {
  "SESSION-TOKEN": uuidV1(),
  "Sec-Fetch-Dest": "empty",
  "Sec-Fetch-Mode": "cors",
  "Sec-Fetch-Site": "cross-site",
  Pragma: "no-cache",
  "Cache-Control": "no-cache",
};

function getHeader() {
  // randomly switch to new session
  if (Math.random() < 0.3) {
    globalHeader["SESSION-TOKEN"] = uuidV1();
  }
  return globalHeader;
}

async function parseManga(url) {
  const res = await fetch(buildAPI(url), getHeader());
  const hexString = Buffer.from(res.rawBody).toString('hex');
  const f = fs.openSync("foo", "w");
  fs.writeSync(f, hexString);
  fs.closeSync(f);
  const proto = protobuf.decodeProto(res.rawBody);
  const data = protobuf.mapProtoToSchema(proto, schema);

  let { chapterListGroup } = data.response.data;
  chapterListGroup = mergeChapterListGroup(chapterListGroup);

  return {
    name: data.response.data.title.name.trim(),
    link: url,
    image: data.response.data.title.portraitImageUrl,
    // deluxe = complete, standard = on going
    isCompleted: data.response.data.status.status === "deluxe",
    chapters: parseChapters(chapterListGroup),
    ...parseAdditionalInfo(data),
  };
}

export default {
  active: true,
  lang: "en",
  site: "MangaPlus",
  homepage: "https://mangaplus.shueisha.co.jp/updates",
  URLRegex,
  parseManga,
  parseChapters,
  parseAdditionalInfo,
};
