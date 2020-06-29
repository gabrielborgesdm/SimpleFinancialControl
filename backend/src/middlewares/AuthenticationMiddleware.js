const HashAndToken = require("../models/HashAndToken")

const authenticateToken = async function(req, res, next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(' ')[1]
    const requestIp = getIp(req) 
    if(!token) return res.status(401).json({"state": "Unauthorized"})
    let _id = await HashAndToken.verifyToken(token, requestIp)
    if(!_id) return res.status(403).json({"state": "Forbidden"})
    req.user = {_id}
    next()
}

const getIp = (req) => req.headers['x-forwarded-for'] || req.connection.remoteAddress

module.exports = {
    authenticateToken,
}
