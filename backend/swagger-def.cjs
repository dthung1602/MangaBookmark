const openapi = "3.0.0";
const info = {
  title: "MangaBookmark API",
  version: "4.6.0",
  description: "API for MangaBookmark client",
};
const components = {
  schemas: {
    Id: {
      type: "string",
      minLength: 24,
      maxLength: 24,
      pattern: "^[0-9a-f]{24}$",
    },
    MangaInfo: {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
        link: {
          type: "string",
          format: "uri",
        },
        image: {
          type: "string",
          format: "uri",
        },
        isCompleted: {
          type: "boolean",
        },
        chapters: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              link: {
                type: "string",
                format: "uri",
              },
            },
          },
        },
        description: {
          type: "string",
        },
        lang: {
          type: "string",
          enum: ["en", "vi"],
        },
        alternativeNames: {
          type: "array",
          items: {
            type: "string",
          },
        },
        authors: {
          type: "array",
          items: {
            type: "string",
          },
        },
        tags: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
    },
    MangaSite: {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
        homepage: {
          type: "string",
          format: "url",
        },
        lang: {
          type: "string",
          enum: ["en", "vi"],
        },
      },
    },
  },
};

module.exports = {
  openapi,
  info,
  components,
};
