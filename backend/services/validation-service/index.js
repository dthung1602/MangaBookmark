const { MangaFilterValidator, MANGA_FILTER_FIELDS } = require("./manga-filter");

module.exports = {
  LocalUserRegistrationValidator: require("./local-user-registration"),
  UnlinkAccountValidator: require("./unlink-account"),
  UserPatchValidator: require("./user-patch"),
  UserPassValidator: require("./user-change-pass"),

  MangaFilterValidator,
  MANGA_FILTER_FIELDS,
  MarkChapterValidator: require("./mark-chapter"),
  MangaInfoValidator: require("./manga-info"),
  MangaCreateValidator: require("./manga-create"),
  MangaPatchValidator: require("./manga-patch"),
  MangaPermissionValidator: require("./manga-permission"),

  SubscriptionCreateValidator: require("./subsription-create"),
  SubscriptionDeleteValidator: require("./subsription-delete"),
};
