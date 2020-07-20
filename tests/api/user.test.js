const request = require("supertest");

const { User } = require("../../models");
const { mockMiddleware, loadFixtures, unloadFixture, connectFixtureDB, disconnectFixtureDB } = require("./utils");
const { closeDBConnection } = require("../../services/db-service");

describe("User API", () => {
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

  it("should return current user profile", async function () {
    const response = await request(app).get("/api/user");

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      _id: "111aaaaaaaaaaaaaaaaaa111",
      username: "user1",
      password: true,
      googleId: "111111111111111111111",
      googleName: "Google User 1",
      googlePic: "https://www.example.com/google/pic1",
      facebookId: "1111111111111111",
      facebookName: "Facebook User 1",
      facebookPic: "https://www.example.com/facebook/pic1",
      primaryAccount: "local",
      __v: 0,
      email: "user1@example.com",
    });
  });

  it("should create local user", async function () {
    const userInfo = {
      username: "edward_elric",
      password: "fullmetalalchemist",
      email: "edward@resembool.town",
    };

    const response = await request(app).post("/api/user").send(userInfo);
    expect(response.status).toEqual(201);

    expect(response.body).toEqual(
      expect.objectContaining({
        ...userInfo,
        password: true,
        primaryAccount: "local",
      }),
    );
    expect(response.body._id).not.toBeUndefined();
  });

  it("should delete user", async function () {
    let response = await request(app).delete("/api/user");
    expect(response.status).toEqual(204);

    const user = await User.findById("111aaaaaaaaaaaaaaaaaa111");
    expect(user).toBeFalsy();
  });

  it("should edit user profile", async function () {
    const userInfo = {
      username: "alphonse_elric",
      email: "alphonse@resembool.town",
    };

    const response = await request(app).patch("/api/user").send(userInfo);
    expect(response.status).toEqual(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        ...userInfo,
        password: true,
        primaryAccount: "local",
        _id: "111aaaaaaaaaaaaaaaaaa111",
      }),
    );
  });

  it("should change user password", async function () {
    const requestBody = {
      password: "NewPassword",
      currentPassword: "password1",
    };

    const response = await request(app).patch("/api/user/change-password").send(requestBody);
    expect(response.status).toEqual(204);

    const user = await User.findById("111aaaaaaaaaaaaaaaaaa111");
    expect(user.validPassword(requestBody.password)).toBeTruthy();
  });

  it("should unlink social network accounts", async function () {
    const requestBody = {
      provider: "google",
      newPrimaryAccount: "facebook",
    };

    const response = await request(app).patch("/api/user/unlink").send(requestBody);
    expect(response.status).toEqual(204);

    const user = await User.findById("111aaaaaaaaaaaaaaaaaa111");
    expect(user).toEqual(
      expect.objectContaining({
        primaryAccount: "facebook",
        googlePic: null,
        googleName: null,
        googleId: null,
      }),
    );
  });
});
