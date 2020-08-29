import { getOfflineTransactions, insertOfflineTransaction, updateOfflineTransaction, deleteOfflineTransaction } from "./OfflineTransactionsCrud"
import { getOnlineTransactions, insertOnlineTransaction } from "./OnlineTransactionsCrud"


export const syncTransactions = async () => {
    let onlineTransactions = await getOnlineTransactions()
    let offlineTransactions = await getOfflineTransactions()
    let {transactionsToInsert, transactionsToUpdate} = await getTransactionsToInsert(onlineTransactions, offlineTransactions)
    if(transactionsToInsert && transactionsToInsert.length) await insertTransactionsToInsert(transactionsToInsert)
    if(transactionsToUpdate && transactionsToUpdate.length) await updateTransactionsToUpdate(transactionsToUpdate)

    let transactionsToDeleteOffline = await getTransactionsToDeleteOffline(offlineTransactions, onlineTransactions)
    if(transactionsToDeleteOffline && transactionsToDeleteOffline.length) {
        await deleteOfflineTransactions(transactionsToDeleteOffline)
    } 
    
}

const getTransactionsToInsert = async (onlineTransactions, offlineTransactions) => {
    if(!offlineTransactions) return {transactionsToInsert: onlineTransactions, transactionsToUpdate: null}
    else if(!onlineTransactions) return {transactionsToInsert: null, transactionsToUpdate: null}

    let transactionsToInsert = [], transactionsToUpdate = []
    onlineTransactions.forEach(onlineTransaction => {
        let offlineTransaction = offlineTransactions.filter(offlineTransaction=>offlineTransaction._id === onlineTransaction._id)
        if(offlineTransaction.length === 0){
            transactionsToInsert.push(onlineTransaction)
        } else {
            let transactionToUpdate = checkHasDifferences(onlineTransactions, offlineTransaction[0])
            if(transactionToUpdate){
                transactionsToUpdate.push(transactionToUpdate)
            }
        }
    })

    return {transactionsToInsert, transactionsToUpdate}
}

const checkHasDifferences = (onlineTransactions, offlineTransaction) => {
    if(!onlineTransactions && !onlineTransactions.length) return
    if(!offlineTransaction) return
    let transactionToBeUpdated = false

    let checkNeedToUpdate = false
    onlineTransactions.forEach(onlineTransaction=>{
        if(onlineTransaction._id === offlineTransaction._id){
            if(onlineTransaction.amount !== offlineTransaction.amount) checkNeedToUpdate = true
            if(onlineTransaction.category !== offlineTransaction.category) checkNeedToUpdate = true
            if(onlineTransaction.details !== offlineTransaction.details) checkNeedToUpdate = true
            if(onlineTransaction.transactionDate !== offlineTransaction.transactionDate) checkNeedToUpdate = true
            if(onlineTransaction.transactionType !== offlineTransaction.transactionType) checkNeedToUpdate = true
            if(checkNeedToUpdate) transactionToBeUpdated = onlineTransaction
        }
    })

    return transactionToBeUpdated
}

const insertTransactionsToInsert = async (transactionsToInsert) => {
    for (const transaction of transactionsToInsert) {
        await insertOfflineTransaction(transaction)
    }
}


const updateTransactionsToUpdate = async (transactionsToUpdate) => {
    if(!transactionsToUpdate || !transactionsToUpdate.length) return
    for (const transaction of transactionsToUpdate) {
        await updateOfflineTransaction(transaction)
    }
}

const getTransactionsToDeleteOffline = (offlineTransactions, onlineTransactions) => {
    if(!onlineTransactions || !onlineTransactions.length) return offlineTransactions
    else if(!offlineTransactions || !offlineTransactions.length) return null

    let transactionsToDeleteOffline = []

    offlineTransactions.forEach(offlineTransaction=>{
        if(onlineTransactions.filter(onlineTransaction=>onlineTransaction._id === offlineTransaction._id).length === 0){
            transactionsToDeleteOffline.push(offlineTransaction)
        }
    })

    return transactionsToDeleteOffline
}

const deleteOfflineTransactions = async (transactionsOffline) => {
    for (const transaction of transactionsOffline) {
        await deleteOfflineTransaction(transaction._id)
    }
}

