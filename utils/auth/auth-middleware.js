const jwt = require('jsonwebtoken');
const secret = require('../secrets');

module.exports = function(req, res, next) {
    const token = req.headers.authorization
     if(!token){
         res.status(401).json("Please Login")
     }
   else if(token) {
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
