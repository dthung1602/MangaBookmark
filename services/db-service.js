const mongoose = require("mongoose");

const { DB_URL } = require("../config");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

async function ensureDBConnection() {
  const state = mongoose.connection.readyState;
  if (state === 0 || state === 3) {
    return mongoose.connect(DB_URL);
  }
  return true;
}

function closeDBConnection() {
  mongoose.connection.close();
}

module.exports = {
  ensureDBConnection,
  closeDBConnection,
};
