const mongoose = require("mongoose");

const { DB_URL } = require("../config");

const DB_DEFAULT_OPTIONS = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

async function ensureDBConnection(url = DB_URL, options = {}) {
  const state = mongoose.connection.readyState;
  if (state === 0 || state === 3) {
    options = { ...DB_DEFAULT_OPTIONS, ...options };
    return mongoose.connect(url, options);
  }
  return true;
}

function closeDBConnection() {
  mongoose.connection.close();
}

const DBConnectionMiddleware = async (req, res, next) => {
  await ensureDBConnection();
  next();
};

module.exports = {
  ensureDBConnection,
  closeDBConnection,
  DBConnectionMiddleware,
  DB_DEFAULT_OPTIONS,
};
