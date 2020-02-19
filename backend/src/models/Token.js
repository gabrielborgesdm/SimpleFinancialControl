const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

module.exports = {

    hashPassword : async (password) => await bcrypt.hash(password, 10),

    compareHash: async (userHash, accountHash) => await bcrypt.compare(userHash, accountHash),

    generateAccessToken : (payload) => jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET),

    verifyToken : function (token){
        let decoded
        try {
            decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        } catch(err) {
            decoded = false
        }
        return(decoded)
    } 
        
}
    
    
    