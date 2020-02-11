const Auth = require("../models/Auth")

module.exports = {
    
    signIn(req, res){
        return res.json("Signing in")
    },

    async signUp(req, res){
        let response = await Auth.createUser(req.body.name, req.body.email, req.body.password)
        return res.json(response)
    },

    /*authenticateToken(req, res, nex){
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        const response = {}
        response.status = 200
        if (token == null) {
            response.status = 404   
        } else{
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
                if(error) {
                    response.status = 403
                } else{
                    req.user = user
                    next()
                }
            })
        }
    }*/
}
