import Realm from "realm"
import { TransactionSchema } from "../schemas/Transactions"

export const getRealm = async () => {
    let realm = await Realm.open({ schema: TransactionSchema })
    return realm
}


export const getOfflineTransactions = async () => {
    let realm = await getRealm()
    let transactions = realm.objects("Transaction")
    return transactions.length ? transactions : null
}

export const insertOfflineTransaction = async (transactions) => {
    console.log(transactions)
    let realm = await getRealm()
    realm.write(async () => {
        await realm.create('Transaction', transactions)
    })
}

export const updateOfflineTransaction = async (transaction) => {
    console.log(transaction)
    let realm = await getRealm()
    realm.write(async () => {
        await realm.create('Transaction', transaction, 'modified');
    })
}

export const deleteOfflineTransaction = async (_id) => {
    try{
        let realm = await getRealm()

        realm.write(async () => {
            let transactions = realm.objects("Transaction")

            let transaction = transactions.filtered(`_id = "${_id}"`)
            
            realm.delete(transaction)
        })
    } catch(error){
        console.log("deleteOfflineTransaction", error)
    }
}