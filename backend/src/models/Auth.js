const Account = require("./schemas/Account")

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

    validateEmail(email){
        let validate = new Validate()
        email = validate.validateField("email", email, "email")
        return (validate.errors.length > 0) ? validate.errors : email
    },

    async getAccount(userObject){
        let account = await Account.findOne(userObject)
        return account
    },

    async confirmAccount(filter){
        let account = await module.exports.getAccount(filter)
        try {
            account.isActive = true
            await account.save()
            account = true
        } catch (error) {
            account = false
        }
    
        return account
    },

    async updateAccount(filter, update){
        let account
        try {
            account = await Account.updateOne({ $and: [filter]}, update)
            account = true
        } catch (error) {
            account = false
        }
        return account
    }
        
}


