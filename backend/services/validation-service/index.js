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
  MangaInfoValidator: require("./manga-info"),
  MangaCreateValidator: require("./manga-create"),
  MangaPatchValidator: require("./manga-patch"),
  MangaPermissionValidator: require("./manga-permission"),

  SubscriptionCreateValidator: require("./subsription-create"),
  SubscriptionDeleteValidator: require("./subsription-delete"),
};
