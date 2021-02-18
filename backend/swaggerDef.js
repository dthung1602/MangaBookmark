module.exports = {
  openapi: "3.0.0",
  info: {
    title: "MangaBookmark API",
    version: "3.3.2",
    description: "API for MangaBookmark client",
  },
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
  },
};
