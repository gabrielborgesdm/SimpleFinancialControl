import "./Transactions.css"
import "./TransactionsList.css"
import React, { Component } from "react"
import axios from "axios"
import Main from "../template/Main"

const token = localStorage.getItem("Token")
const baseUrl = process.env.REACT_APP_API_BASE_URL
axios.defaults.headers["Authorization"] = `Bearer ${token}`

class TransactionsList extends Component{
    constructor(props){
        super(props)
        this.state = {
            transactions: [],
            balance:null,
            incomes: null,
            expenses: null
        }
        //this.deleteTransaction = this.deleteTransaction.bind(this)
    }

    abstractObjectFromTransactionsQuery(query){
        let transactions = []
        Object.values(query).forEach((queryElement, index)=>{
            let {_id, amount, details, transactionType, transactionDate} = queryElement
            transactionDate = new Date(transactionDate).toISOString().split('T')[0] 
            let transaction = {order: index + 1, _id, amount, details, transactionType, transactionDate}
            transactions.push(transaction)
        })
        return transactions
    }
    getWealth(){
        let { transactions } = this.state
        let incomes = 0
        let expenses = 0
        let balance = 0
        
        transactions.forEach((transaction)=>{
            let { amount } = transaction
            if(amount > 0){
                incomes += amount
                
            } else {
                expenses += amount * -1
            }
            balance += amount
        })
        this.setState({incomes: incomes.toFixed(2), expenses: expenses.toFixed(2), balance: balance.toFixed(2)})
    }
    async componentDidMount(){
        axios.get(`${baseUrl}/transaction`)
        .then(response => {
            if(response.data.success){
                let transactions = this.abstractObjectFromTransactionsQuery(response.data.transactions)
                this.setState({transactions: transactions}) 
                this.getWealth()
            }
        })
        .catch(error => console.log(error)) 
    }
    render(){
        return(
        <Main icon="money" title="Transactions" subtitle="Visualize your Transaction's records.">
            <div className="p-3 mt-3">
                <div className="row text-center">
                    <h1 className="col-12 col-sm text-dark-green">Wealth</h1>
                    <div className="col align-self-center">
                        <h5 className="text-light-red">Expenses</h5>
                        <span>{this.state.expenses} R$</span> 
                    </div>
                    <div className="col align-self-center">
                        <h5 className="text-dark-green">Balance</h5>
                        <span className={this.state.balance >= 0 ? "text-light-blue" : "text-light-red"}>{this.state.balance} R$</span> 
                    </div>
                    <div className="col align-self-center">
                        <h5 className="text-light-blue">Incomes</h5>
                        <span>{this.state.incomes} R$</span> 
                    </div>
                    
                </div>
            </div>
            <div className="p-3 mt-3">
                <a className="my-4 text-light-blue" href="/transaction/list">
                    See Detailed list of transactions
                </a>
            </div>
        </Main>)
    }  
}

export default TransactionsList