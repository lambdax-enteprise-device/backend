const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const userRouter = require("../routes/users/user-router.js");
const deviceRouter = require("../routes/devices/device-router.js");
const companyRouter = require("../routes/companies/company-router.js");
const requestsRouter = require("../routes/requests/requests-router.js");
const manufacturersRouter = require("../routes/manufacturers/mfg-router.js");
const deviceTypesRouter = require("../routes/devices/deviceTypes-router.js");
const authRouter = require("../routes/auth/auth-router.js");
const userDevicesRouter = require("../routes/users_devices/users_devices-router.js")
const passwordRouter = require('../routes/auth/resetPassword/reset-password.router')
const fs = require('fs')
const http = require('http')
const server = express();
const path = require('path')
function logger(req, res, next) {
  const url = req.url;
  const method = req.method;
  console.log(`There was a ${method} on ${url} @${Date.now()}`);
  next();
}
const app = http.createServer(function (req,res){
  fs.readFile(__filename + req.url, function (err,data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err))
      return
    }
    res.writeHead(200)
    res.end(data)
  })
}).listen(8080)


server.use(logger)
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(cookieParser());
server.use("/api/auth", authRouter);
server.use("/api/users", userRouter);
server.use("/api/devices", deviceRouter);
server.use("/api/company", companyRouter);
server.use("/api/requests", requestsRouter);
server.use("/api/mfgs", manufacturersRouter);
server.use("/api/device_types", deviceTypesRouter);
server.use("/api/user_devices", userDevicesRouter);
server.use("/api/auth/password", passwordRouter)

server.get("/", (req, res) => {
  return res.json({ message: "Server is up" });
});



module.exports = server,app
