module.exports = {
  RegistrationValidator: require("./registration"),
  UnlinkAccountValidator: require("./unlink-account"),

  MarkChapterValidator: require("./mark-chapter"),
  MangaFilterValidator: require("./manga-filter"),
  MangaInfoValidator: require("./manga-info"),
  MangaCreateValidator: require("./manga-create"),
  MangaPatchValidator: require("./manga-patch"),
  MangaPermissionValidator: require("./manga-permission"),

  SubscriptionCreateValidator: require("./subsription-create"),
  SubscriptionDeleteValidator: require("./subsription-delete"),

  UserPatchValidator: require("./user-patch"),
  UserPassValidator: require("./user-change-pass"),
};
