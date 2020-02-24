const jwt = require('jsonwebtoken');
const secret = require('../config/secrets.js');

module.exports = function(user) {
  const jwtPayload = {
    subject: user.id,
    username: user.email
  };
  const jwtOptions = {
    expiresIn: '3h'
  };
  return jwt.sign(jwtPayload, secret.jwtSecret, jwtOptions);
};
