jest.mock("../../services/log-service", () => ({
  ...jest.requireActual("../../services/log-service"),
  getLogger: jest.fn().mockReturnValue({
    log: jest.fn(),
    error: jest.fn(),
  }),
}));

jest.mock("../../services/image-service/proxy", () => ({
  getImage: jest.fn(),
  getEtag: jest.fn(),
}));

jest.mock("cloudinary", () => ({ v2: { uploader: { upload: jest.fn() } } }));

jest.mock("multer", () => jest.fn());

const request = require("supertest");

const { getEtag, getImage } = require("../../services/image-service/proxy");
const uploadToCloudinary = require("cloudinary").v2.uploader.upload;
const multer = require("multer");
multer.diskStorage = jest.fn();
multer.mockReturnValue({
  single: () => (req, res, next) => {
    req.file = { path: "tempfile" };
    next();
  },
});

const { mockMiddleware, loadFixtures, unloadFixture, connectFixtureDB, disconnectFixtureDB } = require("./utils");
const { ensureDBConnection, closeDBConnection } = require("../../services/db-service");

describe("Image API", () => {
  let app;

  beforeAll(async () => {
    await connectFixtureDB();
  });

  afterAll(async () => {
    await disconnectFixtureDB();
    await closeDBConnection();
  });

  beforeEach(async () => {
    await ensureDBConnection();
    mockMiddleware();
    getEtag.mockReset();
    getImage.mockReset();
    uploadToCloudinary.mockReset();
    // multer.mockReset();
    app = require("../../app");
    await loadFixtures();
  });

  afterEach(async () => {
    await unloadFixture();
  });

  it("should send status 304 when etag matches and cache hit", async function () {
    const url = "/api/image/proxy?url=http%3A%2F%2Fexample.com&site=Mangakakalot";
    const etag = "1234567890";
    getEtag.mockImplementation(() => etag);
    const response = await request(app).get(url).set("if-none-match", etag);
    expect(response.status).toEqual(304);
  });

  it("should send status 304 when etag matches and cache missed", async function () {
    const url = "/api/image/proxy?url=http%3A%2F%2Fexample.com&site=Mangakakalot";
    const etag = "1234567890";
    getEtag.mockImplementation(() => null);
    getImage.mockImplementation(() => ({ etag }));
    const response = await request(app).get(url).set("if-none-match", etag);
    expect(response.status).toEqual(304);
  });

  it("should fetch image", async function () {
    const url = "/api/image/proxy?url=http%3A%2F%2Fexample.com&site=Mangakakalot";
    getEtag.mockImplementation(() => null);
    getImage.mockImplementation(() => ({
      etag: "mock etag",
      contentType: "image/png",
      buffer: Buffer.from("a string"),
    }));
    const response = await request(app).get(url);
    expect(response.status).toEqual(200);
    expect(response.headers["etag"]).toEqual("mock etag");
    expect(response.headers["content-type"]).toEqual("image/png");
    expect(response.body).toEqual(Buffer.from("a string"));
  });

  it("should upload avatar to cloudinary", async function () {
    const imageUrl = "http://example.com/image.png";
    uploadToCloudinary.mockImplementation((f, o, callback) => callback(null, { secure_url: imageUrl }));

    const response = await request(app).post("/api/image/avatar");
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      status: "success",
      url: imageUrl,
      error: "",
    });
  });
});
