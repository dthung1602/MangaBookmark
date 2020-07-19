/**
 Params:
   filters,
   expectedTotalItem,
   expectedTotalPage,
   expectPage,
   expectMangaIds,
 Fields:
   search
   following
   isCompleted
   status
   hidden
   page
   perPage
   sort
 */
module.exports = [
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
  //     FOLLOWING
  // --------------------
  [{ following: "following" }, 1, 1, 1, ["111eeeeeeeeeeeeeeeeee111"]],
  [{ following: "toread" }, 2, 1, 1, ["444eeeeeeeeeeeeeeeeee444", "555eeeeeeeeeeeeeeeeee555"]],
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
  //     PAGINATION
  // --------------------
  [
    { page: 1, perPage: 0 },
    3,
    1,
    1,
    ["111eeeeeeeeeeeeeeeeee111", "444eeeeeeeeeeeeeeeeee444", "555eeeeeeeeeeeeeeeeee555"],
  ],
  [{ page: 1, perPage: 2 }, 3, 2, 1, ["111eeeeeeeeeeeeeeeeee111", "444eeeeeeeeeeeeeeeeee444"]],
  [{ page: 2, perPage: 2 }, 3, 2, 2, ["555eeeeeeeeeeeeeeeeee555"]],
  [{ page: 1, perPage: 1 }, 3, 3, 1, ["111eeeeeeeeeeeeeeeeee111"]],
  [{ page: 3, perPage: 1 }, 3, 3, 3, ["555eeeeeeeeeeeeeeeeee555"]],
  // --------------------
  //        SORT
  // --------------------
  [
    { page: 1, perPage: 0, sort: "name" },
    3,
    1,
    1,
    ["555eeeeeeeeeeeeeeeeee555", "111eeeeeeeeeeeeeeeeee111", "444eeeeeeeeeeeeeeeeee444"],
  ],
  [
    { page: 1, perPage: 0, sort: "-name" },
    3,
    1,
    1,
    ["444eeeeeeeeeeeeeeeeee444", "111eeeeeeeeeeeeeeeeee111", "555eeeeeeeeeeeeeeeeee555"],
  ],
  [
    { page: 1, perPage: 0, sort: "status" },
    3,
    1,
    1,
    ["555eeeeeeeeeeeeeeeeee555", "444eeeeeeeeeeeeeeeeee444", "111eeeeeeeeeeeeeeeeee111"],
  ],
  [
    { page: 1, perPage: 0, sort: "-newChapCount" },
    3,
    1,
    1,
    ["111eeeeeeeeeeeeeeeeee111", "444eeeeeeeeeeeeeeeeee444", "555eeeeeeeeeeeeeeeeee555"],
  ],
  [
    { page: 1, perPage: 0, sort: "-unreadChapCount" },
    3,
    1,
    1,
    ["111eeeeeeeeeeeeeeeeee111", "444eeeeeeeeeeeeeeeeee444", "555eeeeeeeeeeeeeeeeee555"],
  ],
  // ----------------------------
  //       MULTIPLE FILTERS
  // ----------------------------
  [{ page: 2, perPage: 1, sort: "name", following: "toread" }, 2, 2, 2, ["444eeeeeeeeeeeeeeeeee444"]],
  [{ page: 1, perPage: 1, sort: "-status", hidden: false }, 2, 2, 1, ["111eeeeeeeeeeeeeeeeee111"]],
  [
    { page: 1, perPage: 0, sort: "newChapCount", search: "world" },
    2,
    1,
    1,
    ["444eeeeeeeeeeeeeeeeee444", "111eeeeeeeeeeeeeeeeee111"],
  ],
];
