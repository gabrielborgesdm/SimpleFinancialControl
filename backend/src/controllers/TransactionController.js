const Transaction = require("../models/Transaction")
const validate = require("./ValidateController")
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
    
    const {amount, details, recordDate} = req.body
    const transactionObject = await buildTransactionObject(userId, amount, details, recordDate, response)
    
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

const buildTransactionObject = async (userId, amount, details, recordDate, response) => {
    let inputObject = await validate.validateInputArray([
        ["userId", "string", userId], 
        ["amount", "float", amount, {"toFixed": 2}], 
        ["details", "string", details], 
        ["transactionDate", "date", recordDate]
    ])
    if(inputObject.errors) {
        response.addMultipleErrors(inputObject.errors)
    } else{
        if(inputObject.amount > 0) {
            inputObject.transactionType = "income"
        } else if (inputObject.amount < 0) {
            inputObject.transactionType = "expense"
        } else{
            response.addError("amount", "invalid", "Money amount can't be zero")
        }
    }

    return inputObject
}

module.exports = {
    getTransactions,
    postTransaction
}