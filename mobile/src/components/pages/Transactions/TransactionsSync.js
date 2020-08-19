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
        /* Realm.deleteFile({
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

    insertOfflineTransaction = async (transactions) => {
        let realm = await this.getRealm()
        await realm.write(async () => {
            await realm.create('Transaction', transactions)
        })
    }

    syncTransactions = async () => {
        let transactionsToUpdate = null, transactionsToInsert = null, transactionsToDelete = null
        let onlineTransactions = await this.getOnlineTransactions()
        let offlineTransactions = await this.getOfflineTransactions()
        
        console.log(offlineTransactions)
        transactionsToInsert = await this.getTransactionsToInsert(onlineTransactions, offlineTransactions)
        this.insertTransactionsToInsert(transactionsToInsert)

    }

    insertTransactionsToInsert = async (transactionsToInsert) => {
        for (const transaction of transactionsToInsert) {
            await this.insertOfflineTransaction(transaction)
        }
    }

    getTransactionsToInsert = async (onlineTransactions, offlineTransactions) => {
        if(!offlineTransactions) return onlineTransactions
        else if(!onlineTransactions) return null

        let transactionsToInsert = []
        onlineTransactions.forEach(onlineTransaction => {
            if(offlineTransactions.filter(offlineTransaction=>offlineTransaction._id === onlineTransaction._id).length === 0){
                transactionsToInsert.push(onlineTransaction)
            }
        })

        return transactionsToInsert
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