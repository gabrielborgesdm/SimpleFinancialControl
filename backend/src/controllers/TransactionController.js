const Transaction = require("../models/Transaction")
const ResponseBuilder = require("./ResponseBuilder")

const getTransactions = async (req, res) =>{
    const response = new ResponseBuilder()
    const userId = req.user._id
    const transactions = await Transaction.getRecords({userId})
    if(transactions) {
        response.addParams({"transactions": transactions})
    } else {
        response.addError("transactions", "operation failed", "It wasn't possible to get transactions")
    }
    return res.json(response.getParams())
}

const postTransaction = async (req, res) =>{
    const response = new ResponseBuilder()
    const userId = req.user._id
    const {amount, recordType, details, recordDate} = req.body
    const transactionObject = await buildTransactionObject({userId, amount, recordType, details, recordDate}, response)
    if(response.checkSuccess()) {
        const transaction = await Transaction.postRecord(transactionObject)
        if(transaction) {
            response.addParams({transaction})
        } else {
            response.addError("transaction", "operation failed", "It wasn't possible to post the transaction")
        } 
    }
    return res.json(response.getParams())
}

const buildTransactionObject = async (inputObject, response) => {
    inputObject =  await Transaction.validateAndBuildTransactionObject(inputObject)
    if(!inputObject.amount) await response.addMultipleErrors(inputObject)
    return inputObject
}

module.exports = {
    getTransactions,
    postTransaction
}