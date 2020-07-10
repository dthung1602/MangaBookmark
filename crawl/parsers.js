const parserNames = [
  "BlogTruyen",
  "DocTruyenTranh",
  "HamTruyen",
  "HamTruyenTranh",
  "HocVienTruyenTranh",
  "MangaBat",
  "MangaFox",
  "Mangairo",
  "Mangakakalot",
  "MangakakalotS",
  "Manganelo",
  "MangaOwl",
  "Mangazuki.fun",
  "MeDocTruyenTranh",
  "NetTruyen",
  "NhatTruyen",
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

module.exports = { parsers, parserNames, parserRegexMapping };
