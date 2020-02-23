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

    validateAndBuildUserObject (userObject){
        let validate = new Validate()
        for (let [key, value] of Object.entries(userObject)) {
            value = validate.validateField(key, value)
        }
        
        return (validate.errors.length > 0) ? validate.errors : userObject
    },

    validateEmail(email){
        let validate = new Validate()
        email = validate.validateField("email", email, "email")
        return (validate.errors.length > 0) ? validate.errors : email
    },

    async getAccount(userObject){
        let account = await Account.findOne(userObject)
        return account
    },

    async confirmAccount(_id){
        let account = await module.exports.getAccount({_id})
        try {
            account.isActive = true
            await account.save()
            account = true
        } catch (error) {
            account = false
        }
    
        return account
    },

    async updateAccount(_id, update){
        let account
        try {
            account = await Account.findOneAndUpdate(_id, update);
            account = true
        } catch (error) {
            account = false
        }
    
        return account
    }
        
}


