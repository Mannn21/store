const response = require('../utils/response.js')
const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token === null) {
        response(401, "Unauthorized", "Unauthorized", "", "", res)
        return
    }
    if(token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err) {
                response(403, "Forbidden", "Forbidden", "", "", res)
                return
            }
            req.email = decoded.email
            next()
        })
    }
}

module.exports = verifyToken