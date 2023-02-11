jest.mock("../../services/log-service", () => ({
  ...jest.requireActual("../../services/log-service"),
  getLogger: jest.fn().mockReturnValue({
    log: jest.fn(),
    error: jest.fn(),
  }),
}));

const request = require("supertest");

const { User } = require("../../models");
const {
  expectErrors,
  mockMiddleware,
  loadFixtures,
  unloadFixture,
  connectFixtureDB,
  disconnectFixtureDB,
  loginAs,
  resetLogin,
} = require("./utils");
const { closeDBConnection } = require("../../services/db-service");
const { INVALID_NEW_USER, INVALID_PATCH_USER, INVALID_PASSWORD, INVALID_UNLINK } = require("./user.data");

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

    expect(response.status).toBe(200);
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
      note: "",
      __v: 0,
      email: "user1@example.com",
    });
  });

  it("should return null when not login", async function () {
    try {
      loginAs(null);
      const response = await request(app).get("/api/user");
      expect(response.status).toBe(200);
      expect(response.body).toBeNull();
    } finally {
      resetLogin();
    }
  });

  it("should create local user", async function () {
    const userInfo = {
      username: "edward_elric",
      password: "fullmetalalchemist",
      email: "edward@resembool.town",
    };

    const response = await request(app).post("/api/user").send(userInfo);
    expect(response.status).toBe(201);

    expect(response.body).toEqual(
      expect.objectContaining({
        ...userInfo,
        password: true,
      }),
    );
    expect(response.body._id).toBeDefined();
  });

  it.each(INVALID_NEW_USER)("should validate input when creating local user", async function (user, expectErrs) {
    const response = await request(app).post("/api/user").send(user);
    expect(response.status).toBe(400);
    expectErrors(expectErrs, response.body.errors);
  });

  it("should delete user", async function () {
    let response = await request(app).delete("/api/user");
    expect(response.status).toBe(204);

    const user = await User.findById("111aaaaaaaaaaaaaaaaaa111");
    expect(user).toBeFalsy();
  });

  it("should edit user profile", async function () {
    const userInfo = {
      username: "alphonse_elric",
      email: "alphonse@resembool.town",
      note: "this is a note",
    };

    const response = await request(app).patch("/api/user").send(userInfo);
    expect(response.status).toBe(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        ...userInfo,
        password: true,
        _id: "111aaaaaaaaaaaaaaaaaa111",
      }),
    );
  });

  it.each(INVALID_PATCH_USER)("should validate input when editing user profile", async function (user, expectedErrs) {
    const response = await request(app).patch("/api/user").send(user);
    expect(response.status).toBe(400);
    expectErrors(expectedErrs, response.body.errors);
  });

  it("should change user password", async function () {
    const requestBody = {
      password: "NewPassword",
      currentPassword: "password1",
    };

    const response = await request(app).patch("/api/user/change-password").send(requestBody);
    expect(response.status).toBe(204);

    const user = await User.findById("111aaaaaaaaaaaaaaaaaa111");
    expect(user.validPassword(requestBody.password)).toBeTruthy();
  });

  it.each(INVALID_PASSWORD)("should validate input when changing password", async function (password, expectedErrs) {
    const response = await request(app).patch("/api/user/change-password").send(password);
    expect(response.status).toBe(400);
    expectErrors(expectedErrs, response.body.errors);
  });

  it("should unlink social network accounts", async function () {
    const response = await request(app).delete("/api/user/google");
    expect(response.status).toBe(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        googlePic: null,
        googleName: null,
        googleId: null,
      }),
    );
  });

  it.each(INVALID_UNLINK)(
    "should validate input when unlinking social network accounts",
    async function (userId, authProvider, expectedStatusCode, expectedErrs) {
      try {
        loginAs(userId);
        const response = await request(app).delete("/api/user/" + authProvider);
        expect(response.status).toEqual(expectedStatusCode);
        if (expectedStatusCode === 400) {
          expectErrors(expectedErrs, response.body.errors);
        }
      } finally {
        resetLogin();
      }
    },
  );
});
