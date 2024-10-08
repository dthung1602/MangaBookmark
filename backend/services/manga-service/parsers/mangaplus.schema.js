export default {
  1: {
    name: "response",
    subType: {
      8: {
        name: "data",
        subType: {
          1: {
            name: "title",
            subType: {
              1: {
                name: "titleId",
                subType: "Int",
              },
              2: {
                name: "name",
                subType: "String",
              },
              3: {
                name: "author",
                subType: "String",
              },
              4: {
                name: "portraitImageUrl",
                subType: "String",
              },
            },
          },
          3: {
            name: "overview",
            subType: "String",
          },
          8: {
            name: "status",
            subType: "String",
          },
          28: {
            name: "chapterListGroup",
            subType: [
              {
                2: {
                  name: "firstChapterList",
                  subType: [
                    {
                      1: {
                        name: "titleId",
                        subType: "Int",
                      },
                      2: {
                        name: "chapterId",
                        subType: "Int",
                      },
                      4: {
                        name: "chapterSubTitle",
                        subType: "String",
                      },
                    },
                  ],
                },
                3: {
                  name: "midChapterList",
                  subType: [
                    {
                      1: {
                        name: "titleId",
                        subType: "Int",
                      },
                      2: {
                        name: "chapterId",
                        subType: "Int",
                      },
                      4: {
                        name: "chapterSubTitle",
                        subType: "String",
                      },
                    },
                  ],
                },
                4: {
                  name: "lastChapterList",
                  subType: [
                    {
                      1: {
                        name: "titleId",
                        subType: "Int",
                      },
                      2: {
                        name: "chapterId",
                        subType: "Int",
                      },
                      4: {
                        name: "chapterSubTitle",
                        subType: "String",
                      },
                    },
                  ],
                },
              },
            ],
          },
          32: {
            name: "status",
            subType: {
              3: {
                name: "status",
                subType: "String",
              },
            },
          },
        },
      },
    },
  },
};
