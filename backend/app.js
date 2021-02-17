const express = require("express");
const { Router } = express;
const path = require("path");
const passport = require("passport");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");
const staticGZIP = require("express-static-gzip");
const dynamicGZIP = require("compression");
const swaggerUi = require("swagger-ui-express");
const enforceSSL = require("express-enforces-ssl");
const { addAsync } = require("@awaitjs/express");

const swaggerDocument = require("./swagger.json");
const config = require("./config");
const app = addAsync(express());

app.enable("trust proxy"); // let Google & Facebook use https
if (config.NODE_ENV === "production") {
  app.use(enforceSSL());
  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );
}
app.use(logger("dev"));
app.use(express.json({ limit: "64mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cookieSession({
    maxAge: config.COOKIE_MAX_AGE,
    keys: [config.SECRET_KEY],
    sameSite: "lax", // must be lax for google/facebook authentication to work
  }),
);
app.use(passport.initialize());
app.use(passport.session());

const MangaRouter = require("./api/manga");
const UserRouter = require("./api/user");
const SubscriptionRouter = require("./api/subscription");
const MetaRouter = require("./api/meta");
const ImageProxyRouter = require("./api/image-proxy");
const { AuthenticateMiddleware } = require("./services/auth-service");
const { DBConnectionMiddleware } = require("./services/db-service");
const { ErrorHandlerMiddleware } = require("./errors");

// API
const apiRouter = Router();
apiRouter.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
apiRouter.use("/mangas", MangaRouter);
apiRouter.use("/user", UserRouter);
apiRouter.use("/subscriptions", SubscriptionRouter);
apiRouter.use("/meta", MetaRouter);
apiRouter.use("/image-proxy", ImageProxyRouter);
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

module.exports = app;
