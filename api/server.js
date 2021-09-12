const path = require("path");
const express = require("express");
const helmet = require("helmet");
const session = require("express-session");

const usersRouter = require("./users/users-router.js");
//2 import
const authRouter = require("./auth/auth-router.js");

const server = express();

server.use(express.static(path.join(__dirname, "../client")));
server.use(helmet());
server.use(express.json());
server.use(
  session({
    name: "monkey", // name of sessionID
    secret: "make it long and random", //session id encrypted
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false, //in prod should be true, it will only work over HTTPS
      httpOnly: false, // make true if possible ()
    },
    rolling: true, //extend session if good cookie
    resave: false,
    saveUninitialized: false,
  })
);

server.use("/api/users", usersRouter);
// 3 use
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "index.html"));
});

server.use("*", (req, res, next) => {
  next({ status: 404, message: "not found!" });
});

server.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
