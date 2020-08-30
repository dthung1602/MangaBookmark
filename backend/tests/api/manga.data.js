/**
 Params:
   filters,
   expectedTotalItem,
   expectedTotalPage,
   expectPage,
   expectMangaIds,
 Fields:
   search
   shelf
   isCompleted
   status
   hidden
   page
   perPage
   sort
 */
const MANGA_FILTER = [
  // ---------------
  //     SEARCH
  // ---------------
  [{ search: "world" }, 2, 1, 1, ["111eeeeeeeeeeeeeeeeee111", "444eeeeeeeeeeeeeeeeee444"]],
  [{ search: "Cho" }, 1, 1, 1, ["444eeeeeeeeeeeeeeeeee444"]],
  [{ search: "méo " }, 1, 1, 1, ["444eeeeeeeeeeeeeeeeee444"]],
  [{ search: "chuot" }, 1, 1, 1, ["444eeeeeeeeeeeeeeeeee444"]],
  [{ search: "cho grow  " }, 2, 1, 1, ["444eeeeeeeeeeeeeeeeee444", "555eeeeeeeeeeeeeeeeee555"]],
  [{ search: "marry" }, 1, 1, 1, ["555eeeeeeeeeeeeeeeeee555"]],
  // --------------------
  //     SHELF
  // --------------------
  [{ shelf: "reading" }, 1, 1, 1, ["111eeeeeeeeeeeeeeeeee111"]],
  [{ shelf: "to read" }, 2, 1, 1, ["444eeeeeeeeeeeeeeeeee444", "555eeeeeeeeeeeeeeeeee555"]],
  // --------------------
  //     IS COMPLETED
  // --------------------
  [{ isCompleted: true }, 1, 1, 1, ["555eeeeeeeeeeeeeeeeee555"]],
  [{ isCompleted: false }, 2, 1, 1, ["111eeeeeeeeeeeeeeeeee111", "444eeeeeeeeeeeeeeeeee444"]],
  // --------------------
  //     STATUS
  // --------------------
  [{ status: 0 }, 1, 1, 1, ["555eeeeeeeeeeeeeeeeee555"]],
  [{ status: 3 }, 1, 1, 1, ["111eeeeeeeeeeeeeeeeee111"]],
  // --------------------
  //     HIDDEN
  // --------------------
  [{ hidden: true }, 1, 1, 1, ["444eeeeeeeeeeeeeeeeee444"]],
  [{ hidden: false }, 2, 1, 1, ["111eeeeeeeeeeeeeeeeee111", "555eeeeeeeeeeeeeeeeee555"]],
  // --------------------
  //     SITE
  // --------------------
  [{ site: "src1" }, 2, 1, 1, ["111eeeeeeeeeeeeeeeeee111", "444eeeeeeeeeeeeeeeeee444"]],
  // --------------------
  //  PAGINATION & SORT
  // --------------------
  [
    { page: 1, perPage: 0, sort: "id" },
    3,
    1,
    1,
    ["111eeeeeeeeeeeeeeeeee111", "444eeeeeeeeeeeeeeeeee444", "555eeeeeeeeeeeeeeeeee555"],
    true,
  ],
  [{ page: 1, perPage: 2, sort: "id" }, 3, 2, 1, ["111eeeeeeeeeeeeeeeeee111", "444eeeeeeeeeeeeeeeeee444"], false],
  [{ page: 2, perPage: 2, sort: "id" }, 3, 2, 2, ["555eeeeeeeeeeeeeeeeee555"], true],
  [{ page: 1, perPage: 1, sort: "id" }, 3, 3, 1, ["111eeeeeeeeeeeeeeeeee111"], false],
  [{ page: 3, perPage: 1, sort: "id" }, 3, 3, 3, ["555eeeeeeeeeeeeeeeeee555"], true],
  [
    { page: 1, perPage: 0, sort: "name" },
    3,
    1,
    1,
    ["555eeeeeeeeeeeeeeeeee555", "111eeeeeeeeeeeeeeeeee111", "444eeeeeeeeeeeeeeeeee444"],
    true,
  ],
  [
    { page: 1, perPage: 0, sort: "-name" },
    3,
    1,
    1,
    ["444eeeeeeeeeeeeeeeeee444", "111eeeeeeeeeeeeeeeeee111", "555eeeeeeeeeeeeeeeeee555"],
    true,
  ],
  [
    { page: 1, perPage: 0, sort: "status" },
    3,
    1,
    1,
    ["555eeeeeeeeeeeeeeeeee555", "444eeeeeeeeeeeeeeeeee444", "111eeeeeeeeeeeeeeeeee111"],
    true,
  ],
  [
    { page: 1, perPage: 0, sort: "-newChapCount" },
    3,
    1,
    1,
    ["111eeeeeeeeeeeeeeeeee111", "444eeeeeeeeeeeeeeeeee444", "555eeeeeeeeeeeeeeeeee555"],
    true,
  ],
  [
    { page: 1, perPage: 0, sort: "-unreadChapCount" },
    3,
    1,
    1,
    ["111eeeeeeeeeeeeeeeeee111", "444eeeeeeeeeeeeeeeeee444", "555eeeeeeeeeeeeeeeeee555"],
    true,
  ],
  // --------------------
  //  CREATED AT
  // --------------------
  [{ createdAtGTE: "2012-12-12" }, 2, 1, 1, ["444eeeeeeeeeeeeeeeeee444", "555eeeeeeeeeeeeeeeeee555"], true],
  [{ createdAtLTE: "2012-12-12" }, 2, 1, 1, ["111eeeeeeeeeeeeeeeeee111", "444eeeeeeeeeeeeeeeeee444"], true],
  // --------------------
  //  UNREAD CHAP COUNT
  // --------------------
  [{ unreadChapCountGTE: 3 }, 1, 1, 1, ["111eeeeeeeeeeeeeeeeee111"], true],
  [{ unreadChapCountLTE: 2 }, 2, 1, 1, ["444eeeeeeeeeeeeeeeeee444", "555eeeeeeeeeeeeeeeeee555"], true],
  // ----------------------------
  //       MULTIPLE FILTERS
  // ----------------------------
  [{ page: 2, perPage: 1, sort: "name", shelf: "to read" }, 2, 2, 2, ["444eeeeeeeeeeeeeeeeee444"]],
  [{ page: 1, perPage: 1, sort: "-status", hidden: false }, 2, 2, 1, ["111eeeeeeeeeeeeeeeeee111"]],
  [
    { page: 1, perPage: 0, sort: "newChapCount", search: "world" },
    2,
    1,
    1,
    ["444eeeeeeeeeeeeeeeeee444", "111eeeeeeeeeeeeeeeeee111"],
  ],
];

/**
 isRead, chapters, expectedIsReads
 */
const READ_CHAPTERS = [
  [false, ["https://example.com/chap3", "https://example.com/chap2"], [false, false, false, false, false, true]],
  [true, ["https://example.com/chap4", "https://example.com/chap5"], [false, true, true, true, true, true]],
];

/**
 mangaId, payload, expectedErrs, expectedStt,
 */
const INVALID_MANGA_PATCH = [
  ["111eeddddeeeeeeeeeeee111", {}, { manga: "Not found" }, 404],
  ["222eeeeeeeeeeeeeeeeee222", {}, { manga: "Permission denied" }, 403],
  [
    "111eeeeeeeeeeeeeeeeee111",
    { shelf: "random", isCompleted: "a string", hidden: "another string" },
    { shelf: "Invalid value", isCompleted: "Invalid value", hidden: "Invalid value" },
    400,
  ],
];

/**
  link: "https://example.com",
  readChapters: ["https://example.com/chap1", "https://example.com/chap3", "https://example.com/chap4"],
  note: "this is a note",
  isCompleted: true,
  hidden: false,
  shelf: "waiting",
 */
const INVALID_NEW_MANGA = [
  [
    {
      link: "skdjfls dks d",
      isCompleted: "a string",
      hidden: "another string",
      shelf: "random",
    },
    {
      link: "Invalid value",
      isCompleted: "Invalid value",
      hidden: "Invalid value",
      shelf: "Invalid value",
    },
  ],
  [
    {
      link: "https://example.com",
    },
    {
      link: "Unsupported manga site",
    },
  ],
  [
    {
      link: "https://manga1.com",
    },
    {
      link: "Manga already existed",
    },
  ],
];

const INVALID_READ_CHAPTERS = [
  ["111eeddddeeeeeeeeeeee111", {}, { manga: "Not found" }, 404],
  ["222eeeeeeeeeeeeeeeeee222", {}, { manga: "Permission denied" }, 403],
  [
    "111eeeeeeeeeeeeeeeeee111",
    { isRead: "a string", chapters: 123 },
    { isRead: "Invalid value", chapters: "Invalid value" },
    400,
  ],
];

module.exports = { MANGA_FILTER, READ_CHAPTERS, INVALID_MANGA_PATCH, INVALID_NEW_MANGA, INVALID_READ_CHAPTERS };
