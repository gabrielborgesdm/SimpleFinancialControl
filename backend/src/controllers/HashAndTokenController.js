const HashAndToken = require("../models/HashAndToken")

const authenticateToken = async function(req, res, next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(' ')[1]
    const requestIp = getIp(req) 
    if(!token) return res.status(401).json({"state": "Unauthorized"})
    account = HashAndToken.verifyToken(token, requestIp)
    if(!account) return res.status(403).json({"state": "Forbidden"})
    req.user = account
    next()
}

const verifyPassword = async (password, hash) => await HashAndToken.compareHash(password, hash)

const generateToken = (payload) => HashAndToken.generateAccessToken(payload) 

const hashPassword = async (password) => await HashAndToken.hashPassword(password)

const decodeEmailToken = async (token) => await HashAndToken.decodeEmailToken(token)

const getIp = (req) => req.headers['x-forwarded-for'] || req.connection.remoteAddress

module.exports = {
    authenticateToken,
    verifyPassword,
    generateToken,
    hashPassword,
    decodeEmailToken,
    getIp
}


