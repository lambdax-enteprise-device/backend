const jwt = require('jsonwebtoken');
const secret = require('../config/secrets.js');

module.exports = function(req, res, next) {
    const token = req.headers.authorization

    if(token) {
        jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
            if(err) {
                res.status(401).json({ message: 'Unable to verify login'})
            } else {
                req.jwtToken = decodedToken
                next()
            }
        })
    } else {
        res.status(400).json({ message: 'No token provided'})
    }
}
