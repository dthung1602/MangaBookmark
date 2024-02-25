import path from "path";
import { fileURLToPath } from "url";

import express from "express";
import { addAsync } from "@awaitjs/express";

import passport from "passport"; // keep at version 0.5 https://stackoverflow.com/a/72519018/7342188
import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import enforceSSL from "express-enforces-ssl";
import helmet from "helmet";

import staticGZIP from "express-static-gzip";
import dynamicGZIP from "compression";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert { type: "json" };

import config from "./config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Router } = express;

const app = addAsync(express());

app.enable("trust proxy"); // let Google & Facebook use https
if (config.NODE_ENV === "production") {
  app.use(enforceSSL());
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false
    }),
  );
}

app.use(express.json({ limit: "64mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cookieSession({
    maxAge: config.COOKIE_MAX_AGE,
    keys: [config.SECRET_KEY],
    // Must be at least lax for google/facebook authentication to work
    // Must be none for browser extensions to make cross site requests
    // See https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    sameSite: config.NODE_ENV === "production" ? "none" : "lax",
    secure: config.NODE_ENV === "production",
  }),
);
app.use(passport.initialize());
app.use(passport.session());

import MangaRouter from "./api/manga.js";
import UserRouter from "./api/user.js";
import SubscriptionRouter from "./api/subscription.js";
import MetaRouter from "./api/meta.js";
import ImageRouter from "./api/image.js";
import OmnisearchRouter from "./api/omnisearch.js";
import ServiceRouter from "./api/service.js";
import { AuthenticateMiddleware } from "./services/auth-service/index.js";
import { DBConnectionMiddleware } from "./services/db-service.js";
import { ErrorHandlerMiddleware, NotFoundError } from "./errors.js";

// API
const apiRouter = Router();
apiRouter.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
apiRouter.use("/mangas", cors(), MangaRouter);
apiRouter.use("/user", UserRouter);
apiRouter.use("/subscriptions", SubscriptionRouter);
apiRouter.use("/meta", MetaRouter);
apiRouter.use("/image", ImageRouter);
apiRouter.use("/omnisearch", OmnisearchRouter);
apiRouter.use("/_service", ServiceRouter);
apiRouter.use("*", () => {
  throw new NotFoundError();
});
app.use("/api", dynamicGZIP(), DBConnectionMiddleware, AuthenticateMiddleware, apiRouter, ErrorHandlerMiddleware);

// Serve static files
app.use(
  "/",
  staticGZIP(path.join(__dirname, "frontend-build"), {
    enableBrotli: true,
    orderPreference: ["br"],
  }),
);

// Any request that doesn't match one above, send back React's index.html file
const frontendBuildIndex = path.join(__dirname, "frontend-build", "index.html");
app.get("*", (req, res) => {
  res.sendFile(frontendBuildIndex);
});

export default app;
