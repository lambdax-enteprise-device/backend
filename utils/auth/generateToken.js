const jwt = require("jsonwebtoken");
const secret = require("../secrets.js");

module.exports = function(user) {

  const jwtPayload = {
    userId: user.id,
    username: user.email
    
  };
  const jwtOptions = {
    expiresIn: "1d"
  };
  return jwt.sign(jwtPayload, secret.jwtSecret, jwtOptions);
};
