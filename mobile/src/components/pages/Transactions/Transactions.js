import React, { Component } from "react"
import { View, Text, Image, SafeAreaView} from "react-native"
import LinearGradient from 'react-native-linear-gradient'
import { syncTransactions } from '../../services/TransactionsSync'
import { getOfflineTransactions } from '../../services/OfflineTransactionsCrud'

import { getUser } from "../../helpers/StorageHelpers"
import { getMaskedCoin, getUnMaskedCoin } from "../../helpers/LocationHelpers"
import { styles, colors } from "../../../assets/Styles"
const { flex1, h1, h3, h4, textWhite, textSm, textLg, textLightGreen, flexRow, textRed, roundedBox, justifySpaceAround, flexGrow1, textBold, fullWidthImage, minimalistInputGroup, buttonMinimalist, textDarkGrey, p2, mx1, my5 } = styles
const { lightBlue, lightGreen } = colors

export default class Transactions extends Component {

    constructor(props){
        super(props)
        this.state = {
            user: {},
            fetchedTransactions: [],
            transactions: [],
            incomesAndExpenses: [],
            incomes:[],
            expenses: [],
            balanceAmount:0,
            incomesAmount: 0,
            expensesAmount: 0,
        }

        this.transactionsDB = null
    }

    syncAndGetTransactions = async () => {
        await syncTransactions()
        let transactions = await getOfflineTransactions()
        console.log(transactions)
    }

    getUser = async () => {
        let user = await getUser()
        this.setState({user})
    }

    getBalanceAmountColor = () => {
        let {balanceAmount} = this.state

        balanceAmount = getUnMaskedCoin(balanceAmount)
        if(balanceAmount > 0){
            return textLightGreen
        } else if(balanceAmount < 0){
            return textRed
        } else {
            return textDarkGrey
        }
    }


    getWealth = async (transactions) => {
        
        let expenses = []
        let incomes = []
        let incomesAndExpenses = []
        let expensesAmount = 0
        let incomesAmount = 0
        let balanceAmount = 0

        transactions.forEach((transaction)=>{
            let { amount } = transaction
            if(amount > 0){
                incomesAmount += amount
                incomes.push(transaction)
            } else {
                expensesAmount += amount * -1
                expenses.push(transaction)
            }
            incomesAndExpenses.push(transaction)
            balanceAmount += amount
        })
        
        incomesAmount = await getMaskedCoin(incomesAmount)
        expensesAmount = await getMaskedCoin(expensesAmount)
        balanceAmount = await getMaskedCoin(balanceAmount)

        this.setState({
            incomesAmount: incomesAmount, 
            expensesAmount: expensesAmount, 
            balanceAmount: balanceAmount,
            expenses,
            incomes,
            incomesAndExpenses,
            transactions
        })
    }

    componentDidMount(){
        this.getUser() 
        this.syncAndGetTransactions()
    }
 

    render = () => (
        <SafeAreaView style={[flex1]}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 2}} style={[ flexRow, justifySpaceAround, {padding: 50}]} colors={[ lightBlue, lightGreen]}>
            <Text style={[textWhite, textLg]}>{this.state.user.name}'s Info</Text>
            </LinearGradient>
            <View style={[roundedBox, {height: 80, marginTop: -40, backgroundColor: "#fff" }]}>
                <View style={{ flexGrow: 1, height: "100%", justifyContent: "center", alignItems: "center"}}>
                    <Text style={[textRed, textLg]}>{this.state.expensesAmount}</Text>
                    <Text style={[textBold]}>Expenses</Text>
                </View>
    
                <View style={{ flexGrow: 1, height: "100%", justifyContent: "center", alignItems: "center"}}>
                    <Text style={[textLg, this.getBalanceAmountColor()]}>{this.state.balanceAmount}</Text>
                    <Text style={[textBold]}>Balance</Text>
                </View>
    
                <View style={{flexGrow: 1, height: "100%", justifyContent: "center",  alignItems: "center"}}>
                    <Text style={[textLightGreen, textLg]}>{this.state.incomesAmount}</Text>
                    <Text style={[textBold]}>Incomes</Text>
                </View>
            </View>

        </SafeAreaView>
    )
    
}