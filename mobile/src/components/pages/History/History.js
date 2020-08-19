import React, { Component } from "react"
import { View, Text, TextInput, Dimensions, SafeAreaView} from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { styles, colors } from "../../../assets/Styles"
import axios from "../../services/axios"
const { flex1, h1, h3, h4, textWhite, minimalistInputControl, textLg, textRight, historyLog, historyLogIconView, justifySpaceAround, flexGrow1, textBold, fullWidthImage, minimalistInputGroup, buttonMinimalist, textDarkGrey, py3, mx1, my5 } = styles
const { lightBlue, lightGreen } = colors
import { getFormatedDate, getMaskedCoin } from "../../helpers/LocationHelpers"
import { getCategory } from "../../helpers/CategoryHelpers"
import { translate } from "../../helpers/TranslationHelpers"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'


export default class Transactions extends Component {

    constructor(props){
        super(props)
        this.state = {
            user: {},
            filter: ""
        }
    }

    getTransactions = async () => {
        let response = null
        try {
            response = await axios.get("/transaction")
            console.log(response.data)
            if(response && response.data && response.data.success){
                let transactions = await this.abstractObjectFromTransactionsQuery(response.data.transactions)
                this.setState({transactions: transactions, transactionsList: transactions}) 
            }
        } catch (error) {
            console.log(error)
        }
    }

    abstractObjectFromTransactionsQuery = async (query) => {
        let transactions = []
        let index = 0
        for(queryElement of Object.values(query)){
            
            let {_id, amount, category, details, transactionType, transactionDate} = queryElement
            details = details || translate('TRANSACTIONS_LIST_NO_DESCRIPTION')
            category = getCategory(category)
            let categoryIcon = category.icon
            category = category.category
            transactionDate = await getFormatedDate(transactionDate)
            let amountValue = amount
            let amountMasked = await getMaskedCoin(amount)
            let transactionTypeValue = transactionType
            transactionType = transactionType === "income" ? translate('TRANSACTIONS_LIST_INCOME') : translate('TRANSACTIONS_LIST_EXPENSE')
            let transaction = {order: index + 1, _id, amountValue, amountMasked, categoryIcon, category, details, transactionTypeValue, transactionType, transactionDate}
            transactions.push(transaction)
            index++ 
        }

        return transactions
    }

    

    componentDidMount(){
        this.getTransactions()
    }

    render = () => (
        <SafeAreaView style={[flex1, {backgroundColor: "#fff"}]}>
            <ScrollView horizontal={true} contentContainerStyle={{backgroundColor: "#ff00ff"}}>
                <Text>asdsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssasd</Text>
            </ScrollView>

            <ScrollView>
                <TextInput 
                    placeholder={translate('FILTER_TRANSACTIONS')}
                    autoCapitalize="none"
                    defaultValue={this.state.filter}
                    onChangeText={text=>this.setState({filter: text})}
                    style={[minimalistInputControl]}>
                </TextInput>
                {(this.state.transactionsList && this.state.transactionsList.length) ? 
                    this.state.transactionsList.map((transaction, index)=> 
                        <View key={`log${index}${transaction._id}`} style={[historyLog]}>
                            <View style={[historyLogIconView]}>
                                <FontAwesomeIcon size={20} icon={transaction.categoryIcon} />
                            </View>
                            <View style={[flexGrow1]}>
                                <Text style={[textBold]}>{transaction.category}</Text>
                                <Text>{transaction.details}</Text>
                            </View>
                            <View>
                                <Text style={[textRight]}>{transaction.transactionDate}</Text>
                                <Text style={[textRight, textBold]}>{transaction.amountMasked}</Text>
                            </View>
                        </View>
                    )
                :   
                    <View>
                        <Text>Não há</Text>
                    </View>
                } 
            </ScrollView>
        </SafeAreaView>
    )
    
}