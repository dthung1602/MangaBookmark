const URLRegex = /^https?:\/\/nhattruyenmoi\.com\/truyen-tranh\/.+$/;

import NetTruyen from "./NetTruyen.js";
const { parseManga, parseChapters, parseAdditionalInfo, availableTags } = NetTruyen;

export default {
  active: false,
  lang: "vi",
  site: "NhatTruyen",
  homepage: "http://nhattruyenmoi.com/",
  URLRegex,
  parseManga,
  parseChapters,
  parseAdditionalInfo,
  availableTags,
};
