const { MangaFilterValidator, MANGA_FILTER_FIELDS } = require("./manga-filter");

module.exports = {
  UserLocalRegistrationValidator: require("./user-local-registration"),
  UserUnlinkAccountValidator: require("./user-unlink-account"),
  UserPatchValidator: require("./user-patch"),
  UserPassValidator: require("./user-change-pass"),
  UserThirdPartyAuthValidator: require("./user-third-party-auth"),

  MangaFilterValidator,
  MANGA_FILTER_FIELDS,
  MarkChapterValidator: require("./manga-mark-chapter"),
  MangaRereadProgressValidator: require("./manga-reread-progress"),
  MangaInfoValidator: require("./manga-info"),
  MangaCreateValidator: require("./manga-create"),
  MangaPatchValidator: require("./manga-patch"),
  MangaUpdateMultipleValidator: require("./manga-update-multiple"),
  MangaPermissionValidator: require("./manga-permission"),

  SubscriptionCreateValidator: require("./subsription-create"),
  SubscriptionDeleteValidator: require("./subsription-delete"),

  ImageProxyValidator: require("./image-proxy"),

  OmnisearchUserMangaValidator: require("./omnisearch-user-manga"),
  OmnisearchScanlationMangaValidator: require("./omnisearch-scanlation-manga"),
};
