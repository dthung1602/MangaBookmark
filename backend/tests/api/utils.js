const Fixtures = require("node-mongodb-fixtures");

const config = require("../../config");
const mockAuthService = require("../../services/auth-service");

const TEST_DB_DEFAULT_OPTIONS = {
  useUnifiedTopology: true,
};

const fixtures = new Fixtures({
  dir: "tests/fixtures",
  mute: true,
});

async function connectFixtureDB(options = {}) {
  options = { ...TEST_DB_DEFAULT_OPTIONS, ...options };
  await fixtures.connect(config.DB_URL, options);
}

async function disconnectFixtureDB() {
  await fixtures.disconnect();
}

async function loadFixtures() {
  await fixtures.load();
}

async function unloadFixture() {
  await fixtures.unload();
}

const defaultUserId = "111aaaaaaaaaaaaaaaaaa111";

const mockUser = { id: defaultUserId };

function loginAs(userId) {
  mockUser.id = userId;
}

function resetLogin() {
  mockUser.id = defaultUserId;
}

function mockMiddleware() {
  jest.mock("../../services/auth-service", () => {
    return {
      ...mockAuthService,
      AuthenticateMiddleware: (req, res, next) => {
        req.user = mockUser.id === null ? null : mockUser;
        next();
      },
    };
  });
}

function expectErrors(expected, actual) {
  for (let [field, msg] of Object.entries(expected)) {
    expect(actual[field]).not.toBeUndefined();
    expect(actual[field].msg).toEqual(msg);
  }
}

module.exports = {
  connectFixtureDB,
  disconnectFixtureDB,
  loadFixtures,
  unloadFixture,
  mockMiddleware,
  expectErrors,
  loginAs,
  resetLogin,
};
