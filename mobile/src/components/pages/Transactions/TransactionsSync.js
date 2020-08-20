import React, { Component } from "react"
import { View, Text, TouchableOpacity} from "react-native"
import Realm from "realm"
import axios from "../../services/axios"
import { TransactionSchema } from "../../schemas/Transactions"
import LoadingIcon from "../../templates/LoadingIcon"
import {translate} from "../../helpers/TranslationHelpers"
import { styles, colors } from "../../../assets/Styles"
const { syncView, textDarkGrey, buttonMinimalist, bgYellow, opacityLow, flex1} = styles

export default class TransactionsSync extends Component {
    constructor(props){
        super(props)
        this.state = {
            isSynchronizing: true,
            realm: null
        }
    }

    loadRealm = () => {
        /*  Realm.deleteFile({
            schema: TransactionSchema
        }) */  
        Realm.open({
            schema: TransactionSchema
        }).then(realm => {
            this.setState({ realm })
        })  
    }

    getRealm = async () => {
        let realm = this.state.realm
        if(!realm) {
            realm = await Realm.open({ schema: TransactionSchema })
            this.setState({realm})
        }
        return realm
    }

    getOnlineTransactions = async () => {
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

    getOfflineTransactions = async () => {
        let realm = await this.getRealm()
        let transactions = realm.objects("Transaction")
        return transactions.length ? transactions : null
    }

    syncTransactions = async () => {
        let onlineTransactions = await this.getOnlineTransactions()
        let offlineTransactions = await this.getOfflineTransactions()
        
        let {transactionsToInsert, transactionsToUpdate} = await this.getTransactionsToInsert(onlineTransactions, offlineTransactions)
        this.insertTransactionsToInsert(transactionsToInsert)
        this.updateTransactionsToUpdate(transactionsToUpdate)
    }

    getTransactionsToInsert = async (onlineTransactions, offlineTransactions) => {
        if(!offlineTransactions) return {transactionsToInsert: onlineTransactions}
        else if(!onlineTransactions) return null

        let transactionsToInsert = [], transactionsToUpdate = []
        onlineTransactions.forEach(onlineTransaction => {
            let offlineTransaction = offlineTransactions.filter(offlineTransaction=>offlineTransaction._id === onlineTransaction._id)
            if(offlineTransaction.length === 0){
                transactionsToInsert.push(onlineTransaction)
            } else {
                let transactionToUpdate = this.checkHasDifferences(onlineTransactions, offlineTransaction[0])
                if(transactionToUpdate){
                    transactionsToUpdate.push(transactionToUpdate)
                }
            }
        })

        return {transactionsToInsert, transactionsToUpdate}
    }

    checkHasDifferences = (onlineTransactions, offlineTransaction) => {
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

    insertTransactionsToInsert = async (transactionsToInsert) => {
        if(!transactionsToInsert || !transactionsToInsert.length) return
        for (const transaction of transactionsToInsert) {
            await this.insertOfflineTransaction(transaction)
        }
    }

    insertOfflineTransaction = async (transactions) => {
        let realm = await this.getRealm()
        await realm.write(async () => {
            await realm.create('Transaction', transactions)
        })
    }

    updateTransactionsToUpdate = async (transactionsToUpdate) => {
        if(!transactionsToUpdate || !transactionsToUpdate.length) return
        for (const transaction of transactionsToUpdate) {
            await this.updateOfflineTransaction(transaction)
        }
    }

    updateOfflineTransaction = async (transaction) => {
        console.log(transaction)
        let realm = await this.getRealm()
        await realm.write(async () => {
            await realm.create('Transaction', transaction, 'modified');
        })
    }

    
    
    componentDidMount() {
        
        this.loadRealm()
        this.syncTransactions()
    }

    componentWillUnmount() {
        const {realm} = this.state;
        if (realm !== null && !realm.isClosed) {
          realm.close()
        }
    }

    render = () => {
        return (
            <View style={syncView}>
                <LoadingIcon />
                <Text>Sincronizando Transações</Text>
            </View>
        )
    }
    
}