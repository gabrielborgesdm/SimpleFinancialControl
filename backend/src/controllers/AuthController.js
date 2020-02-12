const Auth = require("../models/Auth")

module.exports = {
    
    signIn(req, res){
        return res.json("Signing in")
    },

    async signUp(req, res){
        const auth = new Auth()
        const {name, email, password} = req.body
        let response = await auth.createUser(name, email, password)

        return res.json(response)
    },


}


