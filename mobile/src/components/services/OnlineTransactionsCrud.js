import axios from "./axios"

export const getOnlineTransactions = async () => {
    let response = null, transactions = null
    try {
        response = await axios.get("/transaction")
        if(response && response.data && response.data.success){
            transactions = await response.data.transactions
        }
    } catch (error) {
        console.log(error)
    }
    return transactions
}

export const insertOnlineTransaction = async (transaction) => {
    let {_id, details, amount, category, transactionDate} = transaction
    let success = false
    try{
        let response = await axios.post("/transaction/", {details, amount, category, transactionDate})
        if(response && response.data.success){
            success = true
        }
    } catch (error){
        console.log("transactionsSync insert online", error)
    }
    return success
}