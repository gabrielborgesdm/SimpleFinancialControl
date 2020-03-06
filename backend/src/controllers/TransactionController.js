const Transaction = require("../models/Transaction")
const validate = require("./ValidateController")
const ResponseBuilder = require("./ResponseBuilder")
const Auth = require("../models/Auth")

const getTransactions = async (req, res) =>{
    const response = new ResponseBuilder()
    const _id = req.params.id
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
    const {amount, details, transactionDate} = req.body
    const transactionObject = await buildTransactionObject([
        ["userId", "string", userId], 
        ["amount", "float", amount, {"toFixed": 2}], 
        ["details", "string", details], 
        ["transactionDate", "date", transactionDate]
    ], response)
    if(response.checkSuccess()){
        const account = await Auth.getAccount({"_id": req.user._id})
        if(account) {
            if(!account.isActive) response.addError("account", "nonexistent", "Account does not exist") 
        } else {
            response.addError("account", "nonexistent", "Account does not exist")
        }
    }
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
    inputObject = await validate.validateInputArray(inputObject)
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

const updateTransaction = async (req, res) =>{
    const response = new ResponseBuilder()
    const userId = req.user._id
    const _id = req.params.id
    const { amount, details, transactionDate} = req.body
    const transactionObject = await buildTransactionObject([
        ["_id", "string", _id], 
        ["userId", "string", userId], 
        ["amount", "float", amount, {"toFixed": 2}], 
        ["details", "string", details], 
        ["transactionDate", "date", transactionDate]
    ], response)
    if(response.checkSuccess()) {
        const transaction = await Transaction.putRecord({"_id": transactionObject._id, "userId": userId}, transactionObject)
        if(transaction) {
            response.addParams({transaction})
        } else {
            response.addError("transaction", "operation failed", "It wasn't possible to update the transaction")
        } 
    }
    return res.json(response.getParams())
}

const deleteTransaction = async (req, res) =>{
    const response = new ResponseBuilder()
    const userId = req.user._id
    const { id } = req.params
    const transactionObject = await validate.validateInputArray([["_id", "string", id]])
    if (transactionObject.errors) response.addMultipleErrors(transactionObject.errors)
    if(response.checkSuccess()) {
        const transaction = await Transaction.deleteRecord({"_id": transactionObject._id})
        if(transaction) {
            response.addParams({transaction})
        } else {
            response.addError("transaction", "operation failed", "It wasn't possible to delete the transaction")
        } 
    }
    return res.json(response.getParams())
}

module.exports = {
    getTransactions,
    postTransaction,
    updateTransaction,
    deleteTransaction
}