const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const userRouter = require("../routes/users/user-router.js");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api/users", userRouter);

server.get("/", (req, res) => {
  return res.json({ message: "Server is up" });
});

module.exports = server;
