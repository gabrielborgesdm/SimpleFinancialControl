const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const Validate = require("../models/Validate")
const Account = require("../models/Account")

module.exports = {

    async createUser(name, email, password) {
        let validate = new Validate()
        let user = this.getUserObject(name, email, password, validate)
        response = await this.insertUser(user, validate)
        return response
    },

    getUserObject (name, email, password, validate){
        return ({
            "name" : validate.validateField("name", name, "string"),
            "email" : validate.validateField("email", email, "email"),
            "hash" : validate.validateField("password", password, "string" ) 
        })  
    },

    async insertUser(user, validate) {
        let response = {...validate.getResponse()}
        
        if (validate.HasError != 1){
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
            user.hash = await bcrypt.hash(user.hash, 10) 
            const account = await Account.create(user)
            response.message = "success"
            response.accessToken = accessToken
        }
        return response
    }

    /*checkAuthentication(){
        const userObject = Auth.getUserObject()
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
        response.status = validate.status

        if (validate.HasError == 1){
            response.errors = validate.errors
        } else{
            user.hash = await bcrypt.hash(req.body.password, 10) 
            const account = await Account.create(user)
            response.message = "success"
            response.accessToken = accessToken
        }
    }*/
}
