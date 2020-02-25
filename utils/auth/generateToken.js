const jwt = require("jsonwebtoken");
const secret = require("../secrets.js");

module.exports = function(user) {
  const jwtPayload = {
    subject: user.id,
    username: user.email
  };
  const jwtOptions = {
    expiresIn: "7d"
  };
  return jwt.sign(jwtPayload, secret.jwtSecret, jwtOptions);
};
