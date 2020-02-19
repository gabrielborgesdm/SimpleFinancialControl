const Validate = require("../models/Validate")
const Account = require("../models/Account")

module.exports = {

    async createUser(user) { 
        let account = new Account(user)
        let success = true
        try {
            await account.save()
        } catch (error) {
            success = false
        }   
        return (success) ? account : false
    },

    validateAndBuildUserObject (name, email, password){
        let validate = new Validate()
        let user = {
            "name" : validate.validateField("name", name, "string"),
            "email" : validate.validateField("email", email, "email"),
            "password" : validate.validateField("password", password, "string" ) 
        }
        return (validate.errors.length > 0) ? validate.errors : user
    },

    async getAccount(userObject){
        let account = await Account.findOne(userObject)
        return account
    },
        
}


