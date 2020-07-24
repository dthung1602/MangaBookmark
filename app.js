const express = require("express");
const path = require("path");
const passport = require("passport");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");
const enforceSSL = require("express-enforces-ssl");
const { addAsync } = require("@awaitjs/express");

require("./services/auth-service");
const config = require("./config");
const app = addAsync(express());

app.enable("trust proxy"); // let Google & Facebook use https
if (config.NODE_ENV === "production") {
  app.use(enforceSSL());
}
app.use(helmet());

app.use(logger("dev"));
app.use(express.json({ limit: "64mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// set up session cookies
app.use(
  cookieSession({
    maxAge: config.COOKIE_MAX_AGE,
    keys: [config.SECRET_KEY],
  }),
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

const AuthRouter = require("./api/auth");
const MangaRouter = require("./api/manga");
const UserRouter = require("./api/user");
const SubscriptionRouter = require("./api/subscription");
const { AuthenticateMiddleware, DBConnectionMiddleware, ErrorHandler } = require("./middlewares");

// Static files handled by React
app.use(express.static(path.join(__dirname, "react-mb-client/build")));

// API
app.use("/api/auth", DBConnectionMiddleware, AuthRouter);
app.use("/api/mangas", DBConnectionMiddleware, AuthenticateMiddleware, MangaRouter);
app.use("/api/user", DBConnectionMiddleware, AuthenticateMiddleware, UserRouter);
app.use("/api/subscriptions", DBConnectionMiddleware, AuthenticateMiddleware, SubscriptionRouter);
app.use(ErrorHandler);

// Any request that doesn't match one above, send back React's index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/react-mb-client/build/index.html"));
});

module.exports = app;
