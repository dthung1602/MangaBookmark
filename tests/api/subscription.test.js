const request = require("supertest");

const { mockMiddleware, loadFixtures, unloadFixture, connectFixtureDB, disconnectFixtureDB } = require("./utils");
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
    expect(response.status).toEqual(200);

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
    expect(response.status).toEqual(201);

    expect(response.body).toEqual(expect.objectContaining(sub));
    expect(response.body._id).not.toBeUndefined();
  });

  it("should delete subscription", async function () {
    let response = await request(app).delete("/api/subscriptions/111cccccccccccccccccc111");
    expect(response.status).toEqual(204);

    response = await request(app).get("/api/subscriptions");
    const subIds = response.body.map((sub) => sub._id);
    expect(subIds).toEqual(["222cccccccccccccccccc222"]);
  });
});
