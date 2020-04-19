const parserNames = [
  "BlogTruyen",
  "DocTruyenTranh",
  "HamTruyen",
  "HamTruyenTranh",
  "HocVienTruyenTranh",
  "MangaFox",
  "Mangairo",
  "Mangakakalot",
  "MangakakalotS",
  "Manganelo",
  "MangaOwl",
  "MangaWK",
  "Mangazuki.fun",
  "MeDocTruyenTranh",
  "NetTruyen",
  "Otakusan",
  "SayTruyen",
  "ThichTruyenTranh",
  "TruyenQQ",
  "TruyenSieuHay",
  "TruyenTranh1",
  "TruyenTranh86",
  "TruyenTranh869",
  "TruyenTranhTam",
  "TruyenTranhTuan",
  "TruyenVN",
];

const parsers = parserNames.map(function (p) {
  return require("./" + p);
});

const parserRegexMapping = {};
for (let i = 0; i < parserNames.length; i++) {
  parserRegexMapping[parserNames[i]] = parsers[i].URLRegex;
}

function getParser(url) {
  if (!url) {
    return null;
  }
  for (let i = 0; i < parsers.length; i++) {
    if (url.match(parsers[i].URLRegex)) {
      return parsers[i];
    }
  }
  return null;
}

module.exports = {
  parsers,
  parserNames,
  parserRegexMapping,
  getParser,
};
