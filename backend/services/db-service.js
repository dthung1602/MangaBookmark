import mongoose from "mongoose";
import { DB_URL } from "../config.js";

mongoose.set("strictQuery", true);

async function ensureDBConnection(url = DB_URL, options = {}) {
  const state = mongoose.connection.readyState;
  if (state === 0 || state === 3) {
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

export { ensureDBConnection, closeDBConnection, DBConnectionMiddleware };
export default {
  ensureDBConnection,
  closeDBConnection,
  DBConnectionMiddleware,
};
