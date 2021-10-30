jest.mock("../../services/manga-service/parsers", () => ({
  getParser: jest.fn(),
  supportedSites: [],
  parseManga: jest.fn(),
}));

jest.mock("../../datasource", () => ({
  getMangaUpdateQueue: jest.fn(),
  getMangaUpdateResultCache: jest.fn(),
  getMangaUpdateStatusMemo: jest.fn(),
}));

const request = require("supertest");
const { pick, map, range } = require("lodash");

const {
  MANGA_FILTER,
  READ_CHAPTERS,
  INVALID_MANGA_PATCH,
  INVALID_NEW_MANGA,
  INVALID_READ_CHAPTERS,
} = require("./manga.data");
const { Manga } = require("../../models");
const {
  defaultUserId,
  expectErrors,
  mockMiddleware,
  loadFixtures,
  unloadFixture,
  connectFixtureDB,
  disconnectFixtureDB,
  waitAsync,
} = require("./utils");
const { ensureDBConnection, closeDBConnection } = require("../../services/db-service");
const { getParser, parseManga } = require("../../services/manga-service/parsers");
const { getMangaUpdateStatusMemo, getMangaUpdateQueue, getMangaUpdateResultCache } = require("../../datasource");

function getMockParsedChapters(num, baseURL = "https://example.com/chap") {
  return range(1, num + 1).map((i) => ({
    name: "chap" + i,
    link: baseURL + i,
  }));
}

function getMockParsedManga(override = {}, numChapters = 5, chapterBaseURL = "https://example.com/chap") {
  return {
    name: "This is the name",
    link: "https://example.com",
    image: "https://someimage.com",
    isCompleted: false,
    chapters: getMockParsedChapters(numChapters, chapterBaseURL),
    ...override,
  };
}

describe("Manga API", () => {
  let app;

  beforeAll(async () => {
    getParser.mockReset();
    parseManga.mockReset();
    getMangaUpdateStatusMemo.mockReset();
    getMangaUpdateQueue.mockReset();
    getMangaUpdateResultCache.mockReset();
    await connectFixtureDB();
  });

  afterAll(async () => {
    await disconnectFixtureDB();
    await closeDBConnection();
  });

  beforeEach(async () => {
    await ensureDBConnection();
    mockMiddleware();
    app = require("../../app");
    await loadFixtures();
  });

  afterEach(async () => {
    await unloadFixture();
  });

  it.each(MANGA_FILTER)(
    "should search & filter mangas",
    async function (
      filters,
      expectedTotalItem,
      expectedTotalPage,
      expectPage,
      expectMangaIds,
      expectedIsLastPage = undefined,
    ) {
      const response = await request(app).get("/api/mangas").query(filters);
      expect(response.status).toEqual(200);
      expect(response.body.page).toEqual(expectPage);
      expect(response.body.totalItem).toEqual(expectedTotalItem);
      expect(response.body.totalPage).toEqual(expectedTotalPage);

      let mangaIds = map(response.body.data, "_id");
      if (!filters.sort) {
        mangaIds = mangaIds.sort();
      }
      expect(mangaIds).toEqual(expectMangaIds);

      if (expectedIsLastPage in [true, false]) {
        expect(response.body.isLastPage).toEqual(expectedIsLastPage);
      }
    },
  );

  it("should create manga", async function () {
    const mockParsedManga = getMockParsedManga();
    const mockParsedChapters = mockParsedManga.chapters;

    parseManga.mockImplementation(() =>
      Promise.resolve({
        manga: mockParsedManga,
        usedParser: {
          active: true,
          site: "Sauce",
          URLRegex: /.*/,
        },
      }),
    );

    const submittedManga = {
      link: "https://example.com",
      readChapters: ["https://example.com/chap1", "https://example.com/chap3", "https://example.com/chap4"],
      note: "this is a note",
      isCompleted: true,
      hidden: false,
      shelf: "waiting",
    };

    const response = await request(app).post("/api/mangas").send(submittedManga);
    expect(response.status).toEqual(201);

    const expectedManga = expect.objectContaining({
      ...pick(submittedManga, ["link", "note", "isCompleted", "hidden", "shelf"]),
      _id: expect.anything(),
      name: mockParsedManga.name,
      image: mockParsedManga.image,
      site: mockParsedManga.site,
      user: "111aaaaaaaaaaaaaaaaaa111",
      createdAt: expect.anything(),
      updatedAt: expect.anything(),
      status: 2,
      statusString: "many to read",
      unreadChapCount: 2,
      newChapCount: 2,
    });

    expect(response.body).toEqual(expectedManga);
    expect(map(response.body.chapters, "name")).toEqual(map(mockParsedChapters, "name"));
    expect(map(response.body.chapters, "link")).toEqual(map(mockParsedChapters, "link"));
    expect(map(response.body.chapters, "isRead")).toEqual([true, false, true, true, false]);
  });

  it.each(INVALID_NEW_MANGA)("should validate params when creating manga", async function (payload, expectedErrs) {
    getParser.mockImplementation((url) => {
      const mockParserMapping = {
        "https://example.com": new Error("Unsupported manga site"),
        "https://example.com/no-longer-active": new Error("Site no longer active"),
      };
      if (mockParserMapping.hasOwnProperty(url)) {
        throw mockParserMapping[url];
      }
      const defaultMockParser = jest.fn();
      defaultMockParser.active = true;
      return defaultMockParser;
    });

    const response = await request(app).post("/api/mangas").send(payload);
    expect(response.status).toEqual(400);
    expectErrors(expectedErrs, response.body.errors);
  });

  it("should edit manga", async function () {
    const mangaId = "111eeeeeeeeeeeeeeeeee111";

    const editContent = {
      shelf: "dropped",
      note: "This is the new note",
      isCompleted: true,
      hidden: true,
    };

    const response = await request(app).patch(`/api/mangas/${mangaId}`).send(editContent);
    delete editContent.manga;
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expect.objectContaining(editContent));

    const manga = await Manga.findById(mangaId);
    expect(manga).toEqual(expect.objectContaining(editContent));
  });

  it.each(INVALID_MANGA_PATCH)(
    "should validate params when editing mangas",
    async function (mangaId, payload, expectedErrs, expectedStt) {
      const response = await request(app).patch(`/api/mangas/${mangaId}`).send(payload);
      expect(response.status).toEqual(expectedStt);
      expectErrors(expectedErrs, response.body.errors);
    },
  );

  it("should delete manga", async function () {
    const mangaId = "111eeeeeeeeeeeeeeeeee111";

    const response = await request(app).delete(`/api/mangas/${mangaId}`);
    expect(response.status).toEqual(204);

    const nothing = await Manga.findById(mangaId);
    expect(nothing).toBeFalsy();
  });

  it("should not delete other user manga", async function () {
    const mangaId = "222eeeeeeeeeeeeeeeeee222";
    const response = await request(app).delete(`/api/mangas/${mangaId}`);
    expect(response.status).toEqual(403);
    expectErrors({ manga: "Permission denied" }, response.body.errors);
  });

  it("should not delete non exist manga", async function () {
    const mangaId = "222eedddddeeeeeeeeeee222";
    const response = await request(app).delete(`/api/mangas/${mangaId}`);
    expect(response.status).toEqual(404);
    expectErrors({ manga: "Not found" }, response.body.errors);
  });

  it("should get manga info from link", async function () {
    const mockParsedManga = getMockParsedManga();

    getParser.mockImplementation(() => {});

    parseManga.mockImplementation(() =>
      Promise.resolve({
        manga: mockParsedManga,
        usedParser: {
          active: true,
          site: "Sauce",
          URLRegex: /.*/,
        },
      }),
    );

    const response = await request(app).get("/api/mangas/info").query({ link: "https://example.com" });
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(mockParsedManga);
  });

  it("should validate link when getting manga info from link", async function () {
    getParser.mockImplementation(() => {
      throw new Error("Unsupported manga site");
    });
    let response = await request(app).get("/api/mangas/info").query({ link: "https://example.com" });
    expect(response.status).toEqual(400);
    expectErrors({ link: "Unsupported manga site" }, response.body.errors);

    getParser.mockImplementation(() => {
      throw new Error("Site no longer active");
    });
    response = await request(app).get("/api/mangas/info").query({ link: "https://example.com" });
    expect(response.status).toEqual(400);
    expectErrors({ link: "Site no longer active" }, response.body.errors);
  });

  it.each(READ_CHAPTERS)("should change chapters' read statuses", async function (isRead, chapters, expectedIsReads) {
    const mangaId = "111eeeeeeeeeeeeeeeeee111";
    let requestContent = {
      isRead,
      chapters,
    };

    const response = await request(app).post(`/api/mangas/${mangaId}/mark-chapters`).send(requestContent);
    expect(response.status).toEqual(200);
    expect(map(response.body.chapters, "isRead")).toEqual(expectedIsReads);

    let manga = await Manga.findById(mangaId);
    expect(map(manga.chapters, "isRead")).toEqual(expectedIsReads);
  });

  it.each(INVALID_READ_CHAPTERS)(
    "should validate params when marking chapters",
    async function (mangaId, payload, expectedErrs, expectedStt) {
      const response = await request(app).post(`/api/mangas/${mangaId}/mark-chapters`).send(payload);
      expect(response.status).toEqual(expectedStt);
      expectErrors(expectedErrs, response.body.errors);
    },
  );

  it("should update one manga", async function () {
    const mangaId = "444eeeeeeeeeeeeeeeeee444";
    const mockParsedManga = getMockParsedManga({ isCompleted: true });
    parseManga.mockImplementation(() =>
      Promise.resolve({
        manga: mockParsedManga,
        usedParser: {
          active: true,
          site: "Sauce",
          URLRegex: /.*/,
        },
      }),
    );

    const response = await request(app).post(`/api/mangas/${mangaId}/update`);
    expect(response.status).toEqual(200);

    const expectedManga = expect.objectContaining({
      image: mockParsedManga.image,
      isCompleted: mockParsedManga.isCompleted,
      newChapCount: 2,
      unreadChapCount: 2,
      status: 2,
      statusString: "many to read",
    });
    expect(response.body).toEqual(expectedManga);
    expect(await Manga.findById(mangaId)).toEqual(expectedManga);
  });

  it("should not update non exist manga", async function () {
    const mangaId = "222eedddddeeeeeeeeeee222";
    const response = await request(app).post(`/api/mangas/${mangaId}/update`);
    expect(response.status).toEqual(404);
    expectErrors({ manga: "Not found" }, response.body.errors);
  });

  it("should not update other user manga", async function () {
    const mangaId = "222eeeeeeeeeeeeeeeeee222";
    const response = await request(app).post(`/api/mangas/${mangaId}/update`);
    expect(response.status).toEqual(403);
    expectErrors({ manga: "Permission denied" }, response.body.errors);
  });

  it("should start update multiple mangas", async function () {
    const mangaIds = ["111eeeeeeeeeeeeeeeeee111", "444eeeeeeeeeeeeeeeeee444", "555eeeeeeeeeeeeeeeeee555"];

    parseManga.mockImplementation(async (link) => {
      if (link.includes("5")) {
        throw new Error("Cannot parse manga");
      }
      const mockParsedManga = getMockParsedManga({ image: "https://image.com", _id: mangaIds.pop() }, 6);
      return {
        manga: mockParsedManga,
        usedParser: {
          active: true,
          site: "Sauce",
          URLRegex: /.*/,
        },
      };
    });

    const mockSetStatus = jest.fn();
    mockSetStatus.mockImplementation(() => Promise.resolve());

    getMangaUpdateStatusMemo.mockImplementation(() => ({
      get: () => Promise.resolve("none"),
      set: mockSetStatus,
    }));

    const enqueuedMangaIds = new Set();

    getMangaUpdateQueue.mockImplementation(() => {
      const getDummyMangaFromQueue = (i) => {
        const manga = new Manga({
          name: "Manga name",
          chapters: [],
          _id: `${i}${i}${i}eeeeeeeeeeeeeeeeee${i}${i}${i}`,
          link: `https://manga${i}.com`,
          site: "MangaSite",
        });
        manga.isNew = false;
        return manga;
      };
      const mockMangasInQueues = [getDummyMangaFromQueue(1), getDummyMangaFromQueue(4), getDummyMangaFromQueue(5)];
      return {
        enqueue: (manga) => {
          enqueuedMangaIds.add(manga._id.toString());
          return Promise.resolve();
        },
        retrieve: () => Promise.resolve(mockMangasInQueues.pop()),
      };
    });

    const updateResults = [];

    getMangaUpdateResultCache.mockImplementation(() => ({
      addOne: (_, summary) => Promise.resolve(updateResults.push(summary)),
    }));

    const response = await request(app).post("/api/mangas/update-multiple").send();
    await waitAsync(1); // ensure that the update process in backend has finished

    expect(response.status).toEqual(202);
    expect(response.body.pushedToQueue).toEqual(3);

    expect(enqueuedMangaIds).toEqual(
      new Set(["111eeeeeeeeeeeeeeeeee111", "444eeeeeeeeeeeeeeeeee444", "555eeeeeeeeeeeeeeeeee555"]),
    );
    expect(mockSetStatus.mock.calls[0]).toEqual([defaultUserId, "processing", 20 * 60]);
    expect(mockSetStatus.mock.calls[1]).toEqual([defaultUserId, "done", 20 * 60]);

    for (let result of updateResults) {
      expect(["success", "failed"]).toContain(result.status);
      if (result.status === "success") {
        expect(["111eeeeeeeeeeeeeeeeee111", "444eeeeeeeeeeeeeeeeee444"]).toContain(result.data._id.toString());
      } else {
        expect(result.error).toEqual("Error: Cannot parse manga");
      }
    }
  });

  it("should pop update result", async function () {
    const mockStatusSet = jest.fn();
    const statuses = ["done", "processing"];
    getMangaUpdateStatusMemo.mockImplementation(() => {
      return {
        get: () => statuses.pop(),
        set: mockStatusSet,
      };
    });

    const resultFromCache = [
      {
        status: "success",
        data: {
          _id: "444eeeeeeeeeeeeeeeeee444",
          name: "abc",
          site: "site",
          link: "http:example.com",
          newChapCount: 2,
        },
      },
    ];
    getMangaUpdateResultCache.mockImplementation(() => ({
      retrieveAll: () => Promise.resolve(resultFromCache),
    }));

    let response = await request(app).post(`/api/mangas/update-multiple/pop-result`);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      status: "processing",
      result: [],
    });

    response = await request(app).post(`/api/mangas/update-multiple/pop-result`);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      status: "done",
      result: resultFromCache,
    });
    expect(mockStatusSet.mock.calls[0]).toEqual(["111aaaaaaaaaaaaaaaaaa111", "none", 60 * 20]);
  });
});
