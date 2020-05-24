import "./Transactions.css"
import "./TransactionsList.css"
import React, { Component } from "react"

import axios from "axios"
import 'jquery'
import 'popper.js'

import Main from "../template/Main"

import DateDropdown from "../template/DateDropdown"

import TransactionsLines from "../charts/TransactionsLines"
import TransactionsBars from "../charts/TransactionsBars"

import ExpensesDoughnut from "../charts/ExpensesDoughnut"
import ExpensesLines from "../charts/ExpensesLines"

import IncomesDoughnut from "../charts/IncomesDoughnut"
import IncomeLines from "../charts/IncomesLines"

import CountryHelpers from "../helpers/CountryHelpers"


const token = localStorage.getItem("Token")
const baseUrl = process.env.REACT_APP_API_BASE_URL
axios.defaults.headers["Authorization"] = `Bearer ${token}`

class TransactionsList extends Component{
    constructor(props){
        super(props)
        this.state = {
            fetchedTransactions: [],
            transactions: [],
            incomesAndExpenses: [],
            incomes:[],
            expenses: [],
            balanceAmount:0,
            incomesAmount: 0,
            expensesAmount: 0,
            country: CountryHelpers.getCountry()
        }
    }

    componentDidMount(){
        axios.get(`${baseUrl}/transaction`)
        .then(response => {
            if(response.data.success){
                let transactions = this.abstractObjectFromTransactionsQuery(response.data.transactions)
                this.setState({fetchedTransactions: transactions}) 
                this.getWealth(transactions)
            }
        })
        .catch(error => console.log(error)) 
    }

    abstractObjectFromTransactionsQuery = (query) => {
        let transactions = []
        Object.values(query).forEach((queryElement, index)=>{
            let {_id, amount, category, details, transactionType, transactionDate} = queryElement
            transactionDate = new Date(transactionDate).toISOString().split('T')[0] 
            let transaction = {order: index + 1, _id, amount, category, details, transactionType, transactionDate}
            transactions.push(transaction)
        })
        return transactions
    }

    getWealth = (transactions) => {
        
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

    selectDateFilter = (startDate = null, endDate = null) => {
        if(startDate && endDate){
            this.filterTransactionsWithDate(startDate, endDate)
        } else {
            this.getWealth(this.state.fetchedTransactions) 
        }
        
    }

    filterTransactionsWithDate = (startDate, endDate) => {
        
        let transactions = this.state.fetchedTransactions
        
        transactions = transactions.filter(transaction => {
            let check = true
            check = transaction.transactionDate >= startDate ? check : false 
            check = transaction.transactionDate <= endDate ? check : false
            return check 
        })
        this.getWealth(transactions) 
    }
    render(){
        return(
        <Main icon="money" title="Transactions" subtitle={`Visualize your Transaction's records.`}>
            <div className="p-3 mt-3">
                <div className="row text-center">
                    <h1 className="col-12 col-sm text-dark-green">Wealth</h1>
                    <div className="col align-self-center">
                        <h5 className="text-light-red">Expenses</h5>
                        <span>{CountryHelpers.getFormattedCoinText(this.state.expensesAmount) }</span> 
                    </div>
                    <div className="col align-self-center">
                        <h5 className="text-dark-green">Balance</h5>
                        <span className={this.state.balanceAmount >= 0 ? "text-light-blue" : "text-light-red"}>
                            {CountryHelpers.getFormattedCoinText(this.state.balanceAmount) }    
                        </span> 
                    </div>
                    <div className="col align-self-center">
                        <h5 className="text-light-blue">Incomes</h5>
                        <span>{CountryHelpers.getFormattedCoinText(this.state.incomesAmount) } </span> 
                    </div>
                    
                </div>
            </div>
            <div className="p-3 mt-3">
                <div className="row px-3 d-flex justify-content-between">
                    <a className=" text-light-blue align-self-center" href="/transaction/list">
                        <i className="fa fa-eye"></i> See Transaction's Details
                    </a>
                    <DateDropdown transactions={this.state.transactions} selectDateFilter={this.selectDateFilter} transactionType="all" />
                </div>
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
                                    <TransactionsBars transactions={this.state.incomesAndExpenses}/>
                                </div>
                                <div className="p-0 col-12 col-md-6 my-4 my-md-0"> 
                                    <h5 className="col-12 text-center">Grouped By Date</h5>
                                    <TransactionsLines transactions={this.state.incomesAndExpenses}/>
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
                                    <IncomesDoughnut incomes={this.state.incomes}/>
                                </div>
                                <div className="p-0 col-12 col-md-6 my-4 my-md-0"> 
                                    <h5 className="col-12 text-center">Grouped By Date</h5>
                                    <IncomeLines incomes={this.state.incomes} />
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