import mongoose from "mongoose";
import { DB_URL } from "../config.js";

const DB_DEFAULT_OPTIONS = {
  useUnifiedTopology: true,
};
mongoose.set("strictQuery", true);

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

export { ensureDBConnection, closeDBConnection, DBConnectionMiddleware, DB_DEFAULT_OPTIONS };
export default {
  ensureDBConnection,
  closeDBConnection,
  DBConnectionMiddleware,
  DB_DEFAULT_OPTIONS,
};
