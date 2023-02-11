jest.mock("../../services/log-service", () => ({
  ...jest.requireActual("../../services/log-service"),
  getLogger: jest.fn().mockReturnValue({
    log: jest.fn(),
    error: jest.fn(),
  }),
}));

const request = require("supertest");

const {
  expectErrors,
  mockMiddleware,
  loadFixtures,
  unloadFixture,
  connectFixtureDB,
  disconnectFixtureDB,
} = require("./utils");
const { closeDBConnection } = require("../../services/db-service");

describe("Subscription API", () => {
  let app;

  beforeAll(async () => {
    await connectFixtureDB();
  });

  afterAll(async () => {
    await disconnectFixtureDB();
    await closeDBConnection();
  });

  beforeEach(async () => {
    mockMiddleware();
    app = require("../../app");
    await loadFixtures();
  });

  afterEach(async () => {
    await unloadFixture();
  });

  it("should return subscriptions of current user", async function () {
    const response = await request(app).get("/api/subscriptions");
    expect(response.status).toBe(200);

    const subIds = response.body.map((sub) => sub._id).sort();
    expect(subIds).toEqual(["111cccccccccccccccccc111", "222cccccccccccccccccc222"]);
  });

  it("should create subscription", async function () {
    const sub = {
      os: "Linux",
      browser: "Firefox",
      endpoint: "http://example.dom",
      auth: "auth",
      p256dh: "p256dh",
    };

    const response = await request(app).post("/api/subscriptions").send(sub);
    expect(response.status).toBe(201);

    expect(response.body).toEqual(expect.objectContaining(sub));
    expect(response.body._id).toBeDefined();
  });

  it("should return error when create subscription", async function () {
    const sub = {
      os: "Linus",
      browser: "Firefoxx",
      endpoint: "skd/example.dom",
    };
    const expectedErrors = {
      os: "Invalid value",
      browser: "Invalid value",
      auth: "Invalid value",
      p256dh: "Invalid value",
    };
    const response = await request(app).post("/api/subscriptions").send(sub);
    expect(response.status).toBe(400);
    expectErrors(expectedErrors, response.body.errors);
  });

  it("should delete subscription", async function () {
    let response = await request(app).delete("/api/subscriptions/111cccccccccccccccccc111");
    expect(response.status).toBe(204);

    response = await request(app).get("/api/subscriptions");
    const subIds = response.body.map((sub) => sub._id);
    expect(subIds).toEqual(["222cccccccccccccccccc222"]);
  });

  it("should not delete other user subscription", async function () {
    const subId = "333cccccccccccccccccc333";
    let response = await request(app).delete(`/api/subscriptions/${subId}`);
    expect(response.status).toBe(403);
    expectErrors({ subscription: "Permission denied" }, response.body.errors);
  });

  it("should not delete non existent subscription", async function () {
    const subId = "333ddcccccccccdddcccc333";
    let response = await request(app).delete(`/api/subscriptions/${subId}`);
    expect(response.status).toBe(404);
    expectErrors({ subscription: "Not found" }, response.body.errors);
  });
});
