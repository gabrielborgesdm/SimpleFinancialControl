const HashAndToken = require("../models/HashAndToken")

const verifyPassword = async (password, hash) => await HashAndToken.compareHash(password, hash)

const generateToken = (payload) => HashAndToken.generateAccessToken(payload) 

const hashPassword = async (password) => await HashAndToken.hashPassword(password)

const verifyToken = async (token, ip) => {
    return await HashAndToken.verifyToken(token, ip)
}

const verifyEmailToken = async (token) => {
    return await HashAndToken.verifyEmailToken(token)
}

const getIp = (req) => req.headers['x-forwarded-for'] || req.connection.remoteAddress

module.exports = {
    verifyPassword,
    generateToken,
    hashPassword,
    verifyToken,
    verifyEmailToken,
    getIp
}


