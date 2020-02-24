const Transaction = require("./schemas/Transaction")
const Validate = require("../models/Validate")

module.exports = {
    async getRecords(filter){
        let transaction
        try{    
            transaction = await Transaction.find(filter)
        } catch(error) {
            transaction = false
        }
        return transaction
    },

    async postRecord(dataObject){
        const transaction = new Transaction(dataObject)
        let success
        try{    
            success = await transaction.save()
        } catch(error) {
            console.log(error)
            success = false
        }
        return success
    },
    
    validateAndBuildTransactionObject (transactionObject){
        let validate = new Validate()
        for (let [key, value] of Object.entries(transactionObject)) {
            value = validate.validateField(key, value)
        }
        
        return (validate.errors.length > 0) ? validate.errors : transactionObject
    },
}