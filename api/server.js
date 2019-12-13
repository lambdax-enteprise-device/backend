const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

// server.use('/', authRouter);

server.get("/", (req, res) => {
  return res.json({ message: "Server is up" });
});

module.exports = server;
