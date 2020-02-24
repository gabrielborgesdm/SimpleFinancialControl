const Record = require("./schemas/Transaction")
const Validate = require("../models/Validate")

module.exports = {
    async getRecords(filter){
        let transactions
        try{    
            transactions = await Transactions.find(filter)
        } catch(error) {
            transactions = false
        }
        return transactions
    },

    async postRecord(dataObject){
        const transaction = new Transactions(dataObject)
        let success
        try{    
            
            success = transaction.save()
        } catch(error) {
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