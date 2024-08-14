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
  return `https://jumpg-webapi.tokyo-cdn.com/api/title_detailV3?title_id=${titleId}`;
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
/**
 * NOT COMPLETED
 *
 * Field #30: F2-01 String Length = 2, Hex = 02, UTF8 = "VN"
 * Field #32: 82-02 String Length = 14, Hex = 0E, UTF8 = "standard"
 * As sub-object :
 * Field #1: 08 Varint Value = 2, Hex = 02
 * Field #2: 10 Varint Value = 1, Hex = 01
 * Field #3: 1A String Length = 8, Hex = 08, UTF8 = "standard"
 * Field #34: 92-02 String Length = 2, Hex = 02, UTF8 = ""
 * As sub-object :
 * Field #1: 08 Varint Value = 4, Hex = 04
 * Field #35: 98-02 Varint Value = 1, Hex = 01
 * Field #36: A2-02 String Length = 0, Hex = 00, UTF8 = ""
 *
 *
 * Field #30: F2-01 String Length = 2, Hex = 02, UTF8 = "VN"
 * Field #32: 82-02 String Length = 14, Hex = 0E, UTF8 = "standard"
 * As sub-object :
 * Field #1: 08 Varint Value = 2, Hex = 02
 * Field #2: 10 Varint Value = 1, Hex = 01
 * Field #3: 1A String Length = 8, Hex = 08, UTF8 = "standard"
 * Field #34: 92-02 String Length = 2, Hex = 02, UTF8 = ""
 * As sub-object :
 * Field #1: 08 Varint Value = 4, Hex = 04
 * Field #35: 98-02 Varint Value = 1, Hex = 01
 * Field #36: A2-02 String Length = 0, Hex = 00, UTF8 = ""
 *
 * Field #30: F2-01 String Length = 2, Hex = 02, UTF8 = "VN"
 * Field #32: 82-02 String Length = 14, Hex = 0E, UTF8 = "standard"
 * As sub-object :
 * Field #1: 08 Varint Value = 2, Hex = 02
 * Field #2: 10 Varint Value = 1, Hex = 01
 * Field #3: 1A String Length = 8, Hex = 08, UTF8 = "standard"
 * Field #34: 92-02 String Length = 0, Hex = 00, UTF8 = ""
 * Field #35: 98-02 Varint Value = 1, Hex = 01
 * Field #36: A2-02 String Length = 0, Hex = 00, UTF8 = ""
 *
 * COMPLETED
 *
 * Field #30: F2-01 String Length = 2, Hex = 02, UTF8 = "VN"
 * Field #32: 82-02 String Length = 12, Hex = 0C, UTF8 = "deluxe"
 * As sub-object :
 * Field #1: 08 Varint Value = 8, Hex = 08
 * Field #2: 10 Varint Value = 1, Hex = 01
 * Field #3: 1A String Length = 6, Hex = 06, UTF8 = "deluxe"
 * Field #34: 92-02 String Length = 0, Hex = 00, UTF8 = ""
 * Field #36: A2-02 String Length = 0, Hex = 00, UTF8 = ""
 *
 * Field #30: F2-01 String Length = 2, Hex = 02, UTF8 = "VN"
 * Field #32: 82-02 String Length = 12, Hex = 0C, UTF8 = "deluxe"
 * As sub-object :
 * Field #1: 08 Varint Value = 8, Hex = 08
 * Field #2: 10 Varint Value = 1, Hex = 01
 * Field #3: 1A String Length = 6, Hex = 06, UTF8 = "deluxe"
 * Field #34: 92-02 String Length = 2, Hex = 02, UTF8 = ""
 * As sub-object :
 * Field #1: 08 Varint Value = 4, Hex = 04
 * Field #36: A2-02 String Length = 0, Hex = 00, UTF8 = ""
 *
 * Field #30: F2-01 String Length = 2, Hex = 02, UTF8 = "VN"
 * Field #32: 82-02 String Length = 12, Hex = 0C, UTF8 = "deluxe"
 * As sub-object :
 * Field #1: 08 Varint Value = 8, Hex = 08
 * Field #2: 10 Varint Value = 1, Hex = 01
 * Field #3: 1A String Length = 6, Hex = 06, UTF8 = "deluxe"
 * Field #34: 92-02 String Length = 2, Hex = 02, UTF8 = ""
 * As sub-object :
 * Field #1: 08 Varint Value = 4, Hex = 04
 * Field #36: A2-02 String Length = 0, Hex = 00, UTF8 = ""
 */