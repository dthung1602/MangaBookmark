module.exports = {
  openapi: "3.0.0",
  apis: ["api/*.js", "models/*.js"],
  components: {}, // https://github.com/Surnet/swagger-jsdoc/issues/146#issuecomment-442145933
  info: {
    title: "MangaBookmark API",
    version: "3.0.0",
    description: "API for MangaBookmark client",
  },
};
