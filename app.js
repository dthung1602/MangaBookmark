const express = require("express");
const path = require("path");
const passport = require("passport");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const config = require("config");
const AuthRouter = require("api/auth");
const MangaRouter = require("api/manga");
const UserRouter = require("api/user");
const SubscriptionRouter = require("api/subscription");
const { AuthenticateMiddleware, DBConnectionMiddleware, ErrorHandler, EnforceHTTPS } = require("middlewares");

const app = express();

app.enable("trust proxy"); // let Google & facebook use https
app.use(EnforceHTTPS);

app.use(logger("dev"));
app.use(express.json());
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

// Static files handled by React
app.use(express.static(path.join(__dirname, "react-mb-client/build")));

// API
app.use("/api/auth", DBConnectionMiddleware, AuthRouter);
app.use("/api/mangas", DBConnectionMiddleware, AuthenticateMiddleware, MangaRouter);
app.use("/api/users", DBConnectionMiddleware, AuthenticateMiddleware, UserRouter);
app.use("/api/subscriptions", DBConnectionMiddleware, AuthenticateMiddleware, SubscriptionRouter);
app.use(ErrorHandler);

// Any request that doesn't match one above, send back React's index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/react-mb-client/build/index.html"));
});

module.exports = app;
