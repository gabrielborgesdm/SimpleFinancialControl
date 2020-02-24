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
            success = false
        }
        return success
    },

    async putRecord(_id, filterObject){
        let success
        try{    
             success = await Transaction.updateOne(_id, filterObject)
        } catch(error) {
            success = false
        }
        return success
    },

    async deleteRecord(_id){
        let success
        try{    
            success = await Transaction.deleteOne(_id)
        } catch(error) {
            success = false
        }
        return success
    }

}