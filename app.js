const express = require("express");
const path = require("path");
const passport = require("passport");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const config = require("./config");
const AuthRouter = require("./api/auth");
const MangaRouter = require("./api/manga");
const UserRouter = require("./api/user");
const SubscriptionRouter = require("./api/subscription");
const { AuthenticateMiddleware } = require("./services/auth-service");
const app = express();

function enforceHttps() {
  return function (req, res, next) {
    if (config.NODE_ENV === "production" && req.headers["x-forwarded-proto"] !== "https") {
      return res.redirect("https://" + req.headers.host + req.url);
    } else {
      return next();
    }
  };
}

app.enable("trust proxy"); // let Google & facebook use https
app.use(enforceHttps());

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

// Static files & index.html handled by React
app.use(express.static(path.join(__dirname, "react-mb-client/build")));

// API
app.use("/api/auth", AuthRouter);
app.use("/api/mangas", AuthenticateMiddleware, MangaRouter);
app.use("/api/users", AuthenticateMiddleware, UserRouter);
app.use("/api/subscriptions", AuthenticateMiddleware, SubscriptionRouter);

// Any request that doesn't match one above, send back React's index.html file/
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/react-mb-client/build/index.html"));
});

module.exports = app;
