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
  });

  beforeEach(async () => {
    mockMiddleware();
    app = require("../../app");
    await loadFixtures();
  });

  afterEach(async () => {
    await unloadFixture();
    await closeDBConnection();
  });

  it("should return subscriptions of current user", async function() {
    const response = await request(app).get("/api/subscriptions");
    expect(response.status).toEqual(200);

    const subIds = response.body.map(sub => sub._id).sort();
    expect(subIds).toEqual(["111cccccccccccccccccc111", "222cccccccccccccccccc222"]);
  });
});
