import "./Transactions.css"
import "./TransactionsList.css"

import React, { Component } from "react"
import 'jquery'
import 'popper.js'

import axios from "../services/axios"

import Main from "../template/Main"

import DateDropdown from "../template/DateDropdown"

import TransactionsLines from "../charts/TransactionsLines"
import TransactionsBars from "../charts/TransactionsBars"

import ExpensesDoughnut from "../charts/ExpensesDoughnut"
import ExpensesLines from "../charts/ExpensesLines"

import IncomesDoughnut from "../charts/IncomesDoughnut"
import IncomeLines from "../charts/IncomesLines"

import CountryHelpers from "../helpers/CountryHelpers"

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
        this.translate = this.props.translate
    }

    componentDidMount(){
        axios.get(`/transaction`)
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
        <Main icon="money" title={this.translate('TRANSACTIONS_TITLE')} subtitle={this.translate('TRANSACTIONS_SUBTITLE')}>
            <div className="p-3 mt-3">
                <div className="row text-center">
                    <h1 className="col-12 col-sm text-dark-green">{this.translate('TRANSACTIONS_WEALTH')}</h1>
                    <div className="col-12 col-sm py-2 py-sm-0 align-self-center">
                        <h5 className="text-light-red">{this.translate('TRANSACTIONS_EXPENSES')}</h5>
                        <span>{CountryHelpers.getFormattedCoinText(this.state.expensesAmount) }</span> 
                    </div>
                    <div className="col-12 col-sm py-2 py-sm-0 align-self-center">
                        <h5 className="text-dark-green">{this.translate('TRANSACTIONS_BALANCE')}</h5>
                        <span className={this.state.balanceAmount >= 0 ? "text-light-blue" : "text-light-red"}>
                            {CountryHelpers.getFormattedCoinText(this.state.balanceAmount) }    
                        </span> 
                    </div>
                    <div className="col-12 col-sm py-2 py-sm-0 align-self-center">
                        <h5 className="text-light-blue">{this.translate('TRANSACTIONS_INCOMES')}</h5>
                        <span>{CountryHelpers.getFormattedCoinText(this.state.incomesAmount) } </span> 
                    </div>
                    
                </div>
            </div>
            <div className="p-3 mt-3">
                <div className="row">
                    <div className="col-12 col-sm-8 py-1 py-sm-0 d-flex justify-content-center justify-content-sm-start align-items-center">
                        <a className=" text-light-blue text-center text-sm-left" href="/transaction/list">
                            <i className="fa fa-eye"></i> {this.translate('TRANSACTIONS_SEE_DETAILS')}
                        </a>
                    </div>
                    <div className="col-12 col-sm-4 py-1 py-sm-0 d-flex justify-content-center justify-content-sm-end align-items-center">
                        <DateDropdown transactions={this.state.transactions} selectDateFilter={this.selectDateFilter} translate={this.translate} transactionType="all" />
                    </div>
                </div>
            </div>
            {this.state.transactions.length > 0 ? (
                <React.Fragment>
                    {this.state.expenses.length > 0 && this.state.incomes.length > 0 && (
                        <div className="p-3 mt-3">
                            <div className="row">
                                <div className="col border-bottom pb-2">
                                    <h2 className="text-dark-green">{this.translate('TRANSACTIONS_INCOMES_X_EXPENSES')}</h2>      
                                </div>
                            </div>
                            
                            <div className="row mt-5">
                                <div className="p-0 col-12 col-md-6 my-4 my-md-0">
                                    <h5 className="col-12 text-center">{this.translate('TRANSACTIONS_GROUPED_BY_DATE')}</h5>
                                    <TransactionsBars translate={this.translate} transactions={this.state.incomesAndExpenses}/>
                                </div>
                                <div className="p-0 col-12 col-md-6 my-4 my-md-0"> 
                                    <h5 className="col-12 text-center">{this.translate('TRANSACTIONS_GROUPED_BY_DATE')}</h5>
                                    <TransactionsLines translate={this.translate} transactions={this.state.incomesAndExpenses}/>
                                </div>  
                            </div>
                        </div>
                    )}
        
                    {this.state.expenses.length > 0 && (
                        <div className="p-3 mt-3">
                            
                            <div className="row">
                                <div className="col border-bottom pb-2">
                                    <h2 className="text-dark-green">{this.translate('TRANSACTIONS_EXPENSES')}</h2>      
                                </div>
                            </div>
                            
                            <div className="row mt-5">
                                <div className="p-0 col-12 col-md-6 my-4 my-md-0">
                                    <h5 className="col-12 text-center">{this.translate('TRANSACTIONS_GROUPED_BY_CATEGORIES')}</h5>
                                    <ExpensesDoughnut translate={this.translate} expenses={this.state.expenses}/>
                                </div>
                                <div className="p-0 col-12 col-md-6 my-4 my-md-0"> 
                                    <h5 className="col-12 text-center">{this.translate('TRANSACTIONS_GROUPED_BY_DATE')}</h5>
                                    <ExpensesLines translate={this.translate} expenses={this.state.expenses} />
                                </div>  
                            </div>
                        </div>
                    )}
                    { this.state.incomes.length > 0 &&(
                        <div className="p-3 mt-3">
                            <div className="row">
                                <div className="col border-bottom pb-2">
                                    <h2 className="text-dark-green">{this.translate('TRANSACTIONS_INCOMES')}</h2>      
                                </div>
                            </div>
                            
                            <div className="row mt-5">
                                <div className="p-0 col-12 col-md-6 my-4 my-md-0">
                                    <h5 className="col-12 text-center">{this.translate('TRANSACTIONS_GROUPED_BY_CATEGORIES')}</h5>
                                    <IncomesDoughnut translate={this.translate} incomes={this.state.incomes}/>
                                </div>
                                <div className="p-0 col-12 col-md-6 my-4 my-md-0"> 
                                    <h5 className="col-12 text-center">{this.translate('TRANSACTIONS_GROUPED_BY_DATE')}</h5>
                                    <IncomeLines translate={this.translate} incomes={this.state.incomes} />
                                </div>  
                            </div>
                        </div>
                    )}
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <div className="p-3 mt-3">
                        <span className="text-dark-blue">
                            {this.translate("TRANSACTIONS_NO_TRANSACTIONS")}
                        </span>        
                    </div>
                    <div className="p-3 mt-3">
                        <a className="my-4 text-light-blue" href="/transaction/form">
                        <i className="fa fa-plus"></i> {this.translate('TRANSACTIONS_ADD_TRANSACTION')}
                        </a>
                    </div>
                </React.Fragment>
            )}
            
        </Main>)
    }  
}

export default TransactionsList