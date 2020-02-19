const Token = require("../models/Token")

const authenticateToken = async function(req, res, next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(' ')[1] 
    if(!token) return res.status(401).json({"state": "Unauthorized"})
    account = Token.verifyToken(token)
    if(!account) return res.status(403).json({"state": "Forbidden"})
    req.user = account
    next()
}

const verifyPassword = async (password, hash) => await Token.compareHash(password, hash)

const generateToken = (payload) => Token.generateAccessToken(payload) 

const hashPassword = async (password) => await Token.hashPassword(password)

module.exports = {
    authenticateToken,
    verifyPassword,
    generateToken,
    hashPassword
}


