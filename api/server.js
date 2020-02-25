const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const userRouter = require("../routes/users/user-router.js");
const deviceRouter = require("../routes/devices/device-router.js");
const companyRouter = require("../routes/companies/company-router.js");
const requestsRouter = require("../routes/requests/requests-router.js");
const manufacturersRouter = require("../routes/manufacturers/mfg-router.js");
const deviceTypesRouter = require("../routes/devices/deviceTypes-router.js");
const authRouter = require("../routes/auth/auth-router.js");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/users", userRouter);
server.use("/api/devices", deviceRouter);
server.use("/api/company", companyRouter);
server.use("/api/requests", requestsRouter);
server.use("/api/mfgs", manufacturersRouter);
server.use("/api/device_types", deviceTypesRouter);

server.get("/", (req, res) => {
  return res.json({ message: "Server is up" });
});

module.exports = server;
