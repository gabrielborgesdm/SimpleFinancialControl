import "./Transactions.css"
import "./TransactionsList.css"
import React, { Component } from "react"
import axios from "axios"
import Main from "../template/Main"

import TransactionsLines from "../charts/TransactionsLines"
import TransactionsBars from "../charts/TransactionsBars"

import ExpensesDoughnut from "../charts/ExpensesDoughnut"
import ExpensesLines from "../charts/ExpensesLines"

import IncomesDoughnut from "../charts/IncomesDoughnut"
import IncomeLines from "../charts/IncomesLines"

const token = localStorage.getItem("Token")
const baseUrl = process.env.REACT_APP_API_BASE_URL
axios.defaults.headers["Authorization"] = `Bearer ${token}`

class TransactionsList extends Component{
    constructor(props){
        super(props)
        this.state = {
            transactions: [],
            incomes:[],
            expenses: [],
            balanceAmount:0,
            incomesAmount: 0,
            expensesAmount: 0,
        }
        //this.deleteTransaction = this.deleteTransaction.bind(this)
    }

    abstractObjectFromTransactionsQuery(query){
        let transactions = []
        Object.values(query).forEach((queryElement, index)=>{
            let {_id, amount, category, details, transactionType, transactionDate} = queryElement
            transactionDate = new Date(transactionDate).toISOString().split('T')[0] 
            let transaction = {order: index + 1, _id, amount, category, details, transactionType, transactionDate}
            transactions.push(transaction)
        })
        return transactions
    }

    getWealth(){
        let { transactions, expenses, incomes, expensesAmount, incomesAmount, balanceAmount } = this.state
        
        transactions.forEach((transaction)=>{
            let { amount } = transaction
            if(amount > 0){
                incomesAmount += amount
                incomes.push(transaction)
            } else {
                expensesAmount += amount * -1
                expenses.push(transaction)
            }
            balanceAmount += amount
        })
        this.setState({incomesAmount: incomesAmount.toFixed(2), expensesAmount: expensesAmount.toFixed(2), balanceAmount: balanceAmount.toFixed(2)})
        console.log(this.state.incomes, this.state.expenses)
    }
    
    componentDidMount(){
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
                        <h5 className="text-light-red">Incomes x Expenses</h5>
                        <span>{this.state.expensesAmount} R$</span> 
                    </div>
                    <div className="col align-self-center">
                        <h5 className="text-dark-green">Balance</h5>
                        <span className={this.state.balanceAmount >= 0 ? "text-light-blue" : "text-light-red"}>{this.state.balanceAmount} R$</span> 
                    </div>
                    <div className="col align-self-center">
                        <h5 className="text-light-blue">Incomes</h5>
                        <span>{this.state.incomesAmount} R$</span> 
                    </div>
                    
                </div>
            </div>
            <div className="p-3 mt-3">
                <a className="my-4 text-light-blue" href="/transaction/list">
                    <i className="fa fa-eye"></i> See Transaction's Details
                </a>
            </div>
            {this.state.transactions.length > 0 ? (
                <React.Fragment>
                    {this.state.expenses.length > 0 && this.state.incomes.length > 0 && (
                        <div className="p-3 mt-3">
                            <div className="row">
                                <div className="col border-bottom pb-2">
                                    <h2 className="text-dark-green">Incomes x Expenses</h2>      
                                </div>
                            </div>
                            
                            <div className="row mt-5">
                                <div className="p-0 col-12 col-md-6 my-4 my-md-0">
                                    <h5 className="col-12 text-center">Grouped By Date</h5>
                                    <TransactionsBars transactions={this.state.transactions}/>
                                </div>
                                <div className="p-0 col-12 col-md-6 my-4 my-md-0"> 
                                    <h5 className="col-12 text-center">Grouped By Date</h5>
                                    <TransactionsLines transactions={this.state.transactions}/>
                                </div>  
                            </div>
                        </div>
                    )}
        
                    {this.state.expenses.length > 0 && (
                        <div className="p-3 mt-3">
                            <div className="row">
                                <div className="col border-bottom pb-2">
                                    <h2 className="text-dark-green">Expenses</h2>      
                                </div>
                            </div>
                            
                            <div className="row mt-5">
                                <div className="p-0 col-12 col-md-6 my-4 my-md-0">
                                    <h5 className="col-12 text-center">Grouped by Categories</h5>
                                    <ExpensesDoughnut expenses={this.state.expenses}/>
                                </div>
                                <div className="p-0 col-12 col-md-6 my-4 my-md-0"> 
                                    <h5 className="col-12 text-center">Grouped By Date</h5>
                                    <ExpensesLines expenses={this.state.expenses} />
                                </div>  
                            </div>
                        </div>
                    )}
                    {this.state.incomes.length > 0 && (
                        <div className="p-3 mt-3">
                            <div className="row">
                                <div className="col border-bottom pb-2">
                                    <h2 className="text-dark-green">Incomes</h2>      
                                </div>
                            </div>
                            
                            <div className="row mt-5">
                                <div className="p-0 col-12 col-md-6 my-4 my-md-0">
                                    <h5 className="col-12 text-center">Grouped by Categories</h5>
                                    <IncomesDoughnut transactions={this.state.incomes}/>
                                </div>
                                <div className="p-0 col-12 col-md-6 my-4 my-md-0"> 
                                    <h5 className="col-12 text-center">Grouped By Date</h5>
                                    <IncomeLines transactions={this.state.incomes} />
                                </div>  
                            </div>
                        </div>
                    )}
                </React.Fragment>
            ) : (
                <div className="p-3 mt-3">
                    <a className="my-4 text-light-blue" href="/transaction/form">
                    <i className="fa fa-plus"></i> Add a Record
                    </a>
                </div>
            )}
            
        </Main>)
    }  
}

export default TransactionsList