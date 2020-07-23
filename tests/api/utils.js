const Fixtures = require("node-mongodb-fixtures");

const config = require("../../config");
const mockErrorHandler = require("../../middlewares").ErrorHandler;

const TEST_DB_DEFAULT_OPTIONS = {
  useUnifiedTopology: true,
};

const fixtures = new Fixtures({
  dir: "tests/fixtures",
  mute: true,
});

async function connectFixtureDB(options = {}) {
  options = { ...TEST_DB_DEFAULT_OPTIONS, ...options };
  await fixtures.connect(config.TEST_DB_URL, options);
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

function mockMiddleware() {
  jest.mock("../../services/auth-service", () => {
    // must at least implement serializeUser & deserializeUser
    const passport = require("passport");
    passport.serializeUser((user, done) => {
      done(null, user.id);
    });
    passport.deserializeUser((userId, done) => {
      done(null, { id: userId });
    });

    // always login as the 1st user
    return (req, res, next) => {
      req.user = { id: "111aaaaaaaaaaaaaaaaaa111" };
      next();
    };
  });

  jest.mock("../../middlewares", () => {
    const { ensureDBConnection } = require("../../services/db-service");
    const { TEST_DB_URL } = require("../../config");

    return {
      DBConnectionMiddleware: async (req, res, next) => {
        await ensureDBConnection(TEST_DB_URL);
        next();
      },
      AuthenticateMiddleware: (req, res, next) => {
        req.user = { id: "111aaaaaaaaaaaaaaaaaa111" };
        next();
      },
      ErrorHandler: mockErrorHandler,
    };
  });
}

function expectErrors(expected, actual) {
  for (let [field, msg] of Object.entries(expected)) {
    expect(actual[field]).not.toBeUndefined();
    expect(actual[field].msg).toEqual(msg);
  }
}

module.exports = { connectFixtureDB, disconnectFixtureDB, loadFixtures, unloadFixture, mockMiddleware, expectErrors };
