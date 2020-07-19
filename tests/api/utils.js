const Fixtures = require("node-mongodb-fixtures");
const config = require("../../config");

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
    const { ValidationError } = require("../../exceptions");
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
      ErrorHandler: (err, req, res, next) => {
        if (err instanceof ValidationError) {
          res.status(err.number).json({ errors: err.errors });
          next();
        } else {
          const code = err.number || 500;
          const message = err.message || "Unknown error";
          res.status(code).json({ "": message });
        }
      },
    };
  });
}

module.exports = { connectFixtureDB, disconnectFixtureDB, loadFixtures, unloadFixture, mockMiddleware };