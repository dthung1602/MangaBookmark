module.exports = {
  openapi: "3.0.0",
  apis: ["api/**/*.js", "models/**/*.js"],
  components: {
    schemas: {
      Id: {
        type: "string",
        minLength: 24,
        maxLength: 24,
        pattern: "^\\d{24}$",
      },
    },
  },
  info: {
    title: "MangaBookmark API",
    version: "3.0.0",
    description: "API for MangaBookmark client",
  },
};
