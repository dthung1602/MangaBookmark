const mongoose = require("mongoose");

const { DB_URL } = require("../config");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

async function ensureDBConnection(url = DB_URL) {
  const state = mongoose.connection.readyState;
  if (state === 0 || state === 3) {
    return mongoose.connect(url);
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
