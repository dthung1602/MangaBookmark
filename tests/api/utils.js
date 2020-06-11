const Fixtures = require("node-mongodb-fixtures");

const config = require("../../config");

const fixtures = new Fixtures({ dir: "tests/fixtures" });

async function connectFixtureDB() {
  await fixtures.connect(config.TEST_DB_URL);
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
  jest.mock("../../services/auth-service", () => (req, res, next) => next());

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
