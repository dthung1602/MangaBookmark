jest.mock("../../services/manga-service/parsers", () => ({
  getParser: jest.fn(),
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
const { TEST_DB_URL } = require("../../config");
const { Manga } = require("../../models");
const {
  expectErrors,
  mockMiddleware,
  loadFixtures,
  unloadFixture,
  connectFixtureDB,
  disconnectFixtureDB,
} = require("./utils");
const { ensureDBConnection, closeDBConnection } = require("../../services/db-service");
const { getParser } = require("../../services/manga-service/parsers");

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
    await connectFixtureDB();
  });

  afterAll(async () => {
    await disconnectFixtureDB();
    await closeDBConnection();
  });

  beforeEach(async () => {
    await ensureDBConnection(TEST_DB_URL);
    mockMiddleware();
    app = require("../../app");
    await loadFixtures();
  });

  afterEach(async () => {
    await unloadFixture();
  });

  it.each(MANGA_FILTER)("should search & filter mangas", async function (
    filters,
    expectedTotalItem,
    expectedTotalPage,
    expectPage,
    expectMangaIds,
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
  });

  it("should create manga", async function () {
    const mockParsedManga = getMockParsedManga();
    const mockParsedChapters = mockParsedManga.chapters;

    getParser.mockImplementation(() => ({
      source: "Sauce",
      URLRegex: /.*/,
      parseManga: () => mockParsedManga,
      parseChapters: () => mockParsedChapters,
    }));

    const submittedManga = {
      link: "https://example.com",
      readChapters: ["https://example.com/chap1", "https://example.com/chap3", "https://example.com/chap4"],
      note: "this is a note",
      isCompleted: true,
      hidden: false,
      following: "waiting",
    };

    const response = await request(app).post("/api/mangas").send(submittedManga);
    expect(response.status).toEqual(201);

    const expectedManga = expect.objectContaining({
      ...pick(submittedManga, ["link", "note", "isCompleted", "hidden", "following"]),
      _id: expect.anything(),
      name: mockParsedManga.name,
      image: mockParsedManga.image,
      source: mockParsedManga.source,
      user: "111aaaaaaaaaaaaaaaaaa111",
      createdAt: expect.anything(),
      updatedAt: expect.anything(),
      status: 2,
      statusString: "Many to read",
      unreadChapCount: 2,
      newChapCount: 2,
    });

    expect(response.body).toEqual(expectedManga);
    expect(map(response.body.chapters, "name")).toEqual(map(mockParsedChapters, "name"));
    expect(map(response.body.chapters, "link")).toEqual(map(mockParsedChapters, "link"));
    expect(map(response.body.chapters, "isRead")).toEqual([true, false, true, true, false]);
  });

  it.each(INVALID_NEW_MANGA)("should validate params when creating manga", async function (payload, expectedErrs) {
    getParser.mockImplementation((url) => (url === "https://example.com" ? null : jest.fn()));
    const response = await request(app).post("/api/mangas").send(payload);
    expect(response.status).toEqual(400);
    expectErrors(expectedErrs, response.body.errors);
  });

  it("should edit manga", async function () {
    const mangaId = "111eeeeeeeeeeeeeeeeee111";

    const editContent = {
      following: "dropped",
      note: "This is the new note",
      isCompleted: true,
      hidden: true,
    };

    const response = await request(app).patch(`/api/mangas/${mangaId}`).send(editContent);
    expect(response.status).toEqual(204);

    const manga = await Manga.findById(mangaId);
    delete editContent.manga;
    expect(manga).toEqual(expect.objectContaining(editContent));
  });

  it.each(INVALID_MANGA_PATCH)("should validate params when editing mangas", async function (
    mangaId,
    payload,
    expectedErrs,
    expectedStt,
  ) {
    const response = await request(app).patch(`/api/mangas/${mangaId}`).send(payload);
    expect(response.status).toEqual(expectedStt);
    expectErrors(expectedErrs, response.body.errors);
  });

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
    const mockParsedChapters = mockParsedManga.chapters;
    getParser.mockImplementation(() => ({
      source: "Sauce",
      URLRegex: /.*/,
      parseManga: () => mockParsedManga,
      parseChapters: () => mockParsedChapters,
    }));

    const response = await request(app).get("/api/mangas/info").query({ link: "https://example.com" });
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(mockParsedManga);
  });

  it("should validate link when getting manga info from link", async function () {
    getParser.mockImplementation(() => null);
    const response = await request(app).get("/api/mangas/info").query({ link: "https://example.com" });
    expect(response.status).toEqual(400);
    expectErrors({ link: "Unsupported manga source" }, response.body.errors);
  });

  it.each(READ_CHAPTERS)("should change chapters' read statuses", async function (isRead, chapters, expectedIsReads) {
    const mangaId = "111eeeeeeeeeeeeeeeeee111";
    let requestContent = {
      isRead,
      chapters,
    };

    const response = await request(app).post(`/api/mangas/${mangaId}/mark-chapters`).send(requestContent);
    expect(response.status).toEqual(204);

    let manga = await Manga.findById(mangaId);
    expect(map(manga.chapters, "isRead")).toEqual(expectedIsReads);
  });

  it.each(INVALID_READ_CHAPTERS)("should validate params when marking chapters", async function (
    mangaId,
    payload,
    expectedErrs,
    expectedStt,
  ) {
    const response = await request(app).post(`/api/mangas/${mangaId}/mark-chapters`).send(payload);
    expect(response.status).toEqual(expectedStt);
    expectErrors(expectedErrs, response.body.errors);
  });

  it("should update one manga", async function () {
    const mangaId = "444eeeeeeeeeeeeeeeeee444";
    const mockParsedManga = getMockParsedManga({ isCompleted: true });
    const mockParsedChapters = mockParsedManga.chapters;
    getParser.mockImplementation(() => ({
      source: "Sauce",
      URLRegex: /.*/,
      parseManga: () => mockParsedManga,
      parseChapters: () => mockParsedChapters,
    }));

    const response = await request(app).post(`/api/mangas/${mangaId}/update`);
    expect(response.status).toEqual(200);

    const expectedManga = expect.objectContaining({
      image: mockParsedManga.image,
      isCompleted: mockParsedManga.isCompleted,
      newChapCount: 2,
      unreadChapCount: 2,
      status: 2,
      statusString: "Many to read",
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

  it("should update multiple mangas", async function () {
    getParser.mockImplementation((link) => {
      if (link.includes("5")) {
        throw new Error("Cannot parse manga");
      }
      const mockParsedManga = getMockParsedManga({ image: "https://image.com" }, 6);
      return {
        source: "Sauce",
        URLRegex: /.*/,
        parseManga: () => mockParsedManga,
        parseChapters: () => mockParsedManga.chapters,
      };
    });

    const spyConsoleError = jest.spyOn(console, "error").mockImplementation();

    const response = await request(app).post("/api/mangas/update-multiple").send();
    expect(response.status).toEqual(200);

    expect(response.body.total).toEqual(3);
    expect(map(response.body.success, "_id").sort()).toEqual(["111eeeeeeeeeeeeeeeeee111", "444eeeeeeeeeeeeeeeeee444"]);
    expect(map(response.body.fail, "_id")).toEqual(["555eeeeeeeeeeeeeeeeee555"]);
    expect(spyConsoleError).toHaveBeenCalledWith(`    Fail to update: 'get Married When You Grow Up!'`);

    spyConsoleError.mockRestore();
  });
});
