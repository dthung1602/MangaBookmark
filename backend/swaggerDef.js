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
      MangaUpdateReport: {
        type: "object",
        properties: {
          _id: {
            type: "string",
          },
          name: {
            type: "string",
          },
          site: {
            type: "string",
          },
          link: {
            type: "string",
            format: "url",
          },
          newChapCount: {
            type: "integer",
          },
        },
      },
    },
  },
  info: {
    title: "MangaBookmark API",
    version: "3.1.0",
    description: "API for MangaBookmark client",
  },
};
