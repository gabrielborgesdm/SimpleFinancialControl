const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const Response = require("../models/Response")
const Validate = require("../models/Validate")
const Account = require("../models/Account")

class Auth extends Response{

    constructor(){
        super()
    }

    async createUser(name, email, password) {
        
        let user = this.getUserObject(name, email, password)
        let emailExists = await Account.findOne({email: user.email })
        let response
        if(emailExists){
            this.addError("email", "unavailable", "Email is unavailable")
            response = this.getResponse()
            
        } else{
            response = await this.insertUser(user)
        }

        return response
    }

    getUserObject (name, email, password){
        let validate = new Validate()
        let user = {
            "name" : validate.validateField("name", name, "string"),
            "email" : validate.validateField("email", email, "email"),
            "hash" : validate.validateField("password", password, "string" ) 
        }
        if(validate.errors.length > 0) {
            this.addMultipleErrors(validate.errors)
        }
        return user
    }

    async insertUser(user) {
        if (this.success){
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
            user.hash = await bcrypt.hash(user.hash, 10) 
            const account = await Account.create(user)
            let response = this.getResponse()
            response.accessToken = accessToken
            return response
        }
    }

}

module.exports = Auth
