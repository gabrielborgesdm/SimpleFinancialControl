import "./TransactionsList.css"
import React, { Component } from "react"
import axios from "../services/axios"
import Main from "../template/Main"
import CountryHelpers from "../helpers/CountryHelpers"

import DateDropdown from "../template/DateDropdown"

import  $ from 'jquery'
import 'popper.js'

class TransactionsList extends Component{
    constructor(props){
        super(props)
        this.state = {
            transactions: [],
            transactionsList: []
        }
        this.translate = this.props.translate
    }

    buildTransactionsTable(transactions){
        this.setState({transactionsList: transactions})
    }
    turnArrowsToRight(elementIndex = -1) {
        let arrows = document.getElementsByName("arrow")
        for(let i = 0; i < arrows.length; i++){
            if (i !== elementIndex) arrows[i].className = "fa fa-arrow-right"
        }  
    }

    lowerCaseIfString(value) {
        if (typeof value === "string") value = value.toLowerCase()
        return value
    }

    sort(e, type, elementIndex){ 
        
        this.turnArrowsToRight(elementIndex)
        let transactions = this.state.transactionsList
        if (e.target.className === "fa fa-arrow-down" ){
            e.target.className = "fa fa-arrow-up"
            transactions = transactions.slice(0).sort((a, b) => this.lowerCaseIfString(a[type]) >= this.lowerCaseIfString(b[type]) ? 1 : -1)
        } else{
            e.target.className = "fa fa-arrow-down"
            transactions = transactions.slice(0).sort((a, b) => this.lowerCaseIfString(a[type]) < this.lowerCaseIfString(b[type]) ? 1 : -1)
        }
        this.buildTransactionsTable(transactions)
    }

    filter(filter){
        filter = filter.toLowerCase()
        let { transactions } = this.state
        const trueIfFiltered = (transaction) => {

            let filtered = Object.values(transaction).filter((item)=>{
                return this.lowerCaseIfString(item.toString()).includes(filter)
            })
            return filtered.length > 0 ? true : false
        }
        this.turnArrowsToRight()
        let filteredTransactions = transactions.filter((transaction)=>trueIfFiltered(transaction))
        this.buildTransactionsTable(filter !== "" ? filteredTransactions : transactions)
    }

    deleteTransaction = async (id) => {
        if (!window.confirm(this.translate('TRANSACTIONS_LIST_WARNING_DELETE_RECORD'))) return
        let response = null
        try {
            response = await axios.delete(`/transaction/${id}`)
        } catch (error) {
            console.log(error)
        }
       
        if(response && response.data.success){
            let newTransactions = this.state.transactions
            newTransactions = newTransactions.filter((transaction)=>transaction._id !== id)
            this.setState({transactions:newTransactions})
            this.buildTransactionsTable(newTransactions)
        } else {
            alert(this.translate('TRANSACTIONS_LIST_COULDNT_DELETE_RECORD'))
        }

    }

    abstractObjectFromTransactionsQuery(query){
        let transactions = []
        Object.values(query).forEach((queryElement, index)=>{
            let {_id, amount, category, details, transactionType, transactionDate} = queryElement
            details = details || this.translate('TRANSACTIONS_LIST_NO_DESCRIPTION')
            category = this.getCategory(category)
            transactionDate = CountryHelpers.getFormatedDate(transactionDate)
            amount = CountryHelpers.getStringMasked(amount)
            transactionType = transactionType === "income" ? this.translate('TRANSACTIONS_LIST_INCOME') : this.translate('TRANSACTIONS_LIST_EXPENSE')
            let transaction = {order: index + 1, _id, amount, category, details, transactionType, transactionDate}
            transactions.push(transaction)
        })
        return transactions
    }

    getCategory = (key) => {
        let category
        switch(key){
            case "others": 
                category = this.translate('CHARTS_CATEGORY_OTHERS')
                break
            case "food": 
                category = this.translate('CHARTS_CATEGORY_FOOD')
                break
            case "shopping": 
                category = this.translate('CHARTS_CATEGORY_SHOPPING')
                break
            case "housing": 
                category = this.translate('CHARTS_CATEGORY_HOUSING')
                break
            case "transportation": 
                category = this.translate('CHARTS_CATEGORY_TRANSPORTATION')
                break
            case "vehicle": 
                category = this.translate('CHARTS_CATEGORY_VEHICLE')
                break
            case "entertainment": 
                category = this.translate('CHARTS_CATEGORY_ENTERTAINMENT')
                break
            case "technology": 
                category = this.translate('CHARTS_CATEGORY_TECHNOLOGY')
                break
            case "education": 
                category = this.translate('CHARTS_CATEGORY_EDUCATION')
                break
            case "investments": 
                category = this.translate('CHARTS_CATEGORY_INVESTMENTS')
                break
            case "expenses": 
                category = this.translate('CHARTS_CATEGORY_EXPENSES')
                break
            case "work": 
                category = this.translate('CHARTS_CATEGORY_WORK')
                break
            default: 
                category = key
                break
        }
        return category
    }
    getTransactions = async () => {
        let response = null
        try {
            response = await axios.get("/transaction")
        } catch (error) {
            console.log(error)
        }
        if(response && response.data && response.data.success){
            let transactions = this.abstractObjectFromTransactionsQuery(response.data.transactions)
            this.setState({transactions: transactions}) 
            this.buildTransactionsTable(transactions)
        }
    }

    toogleModal = () => {
        $("#modal-export-data").modal('toggle')
    }

    uploadTransaction = async (transactions, fileName, fileType) => {
        let response = null
        try {
            response = await axios.post("/transaction/download", {transactions, fileName, fileType, country: localStorage.getItem("country")})
            if(response.data){
                response = response.data
            }
        } catch (error) {
            console.log(error)
        }
        return response
    } 

    downloadTransactionsData = async (e, fileType) => {
        let button = e.currentTarget
        let icon = e.currentTarget.querySelector("i")
        let span = e.currentTarget.querySelector("span")

        let fileName = this.buildFileName(fileType)

        let data = this.state.transactionsList
        data = data.map(transaction => {
            let country = localStorage.getItem("country")
            let newTransaction
            if(country === "brazil"){
                newTransaction = {
                    ordem: transaction.order, 
                    quantidade: transaction.amount, 
                    categoria: transaction.category, 
                    detalhes: transaction.details, 
                    tipo: transaction.transactionType, 
                    data: transaction.transactionDate
                }
            } else {
                newTransaction = {
                    order: transaction.order, 
                    amount: transaction.amount, 
                    category: transaction.category, 
                    details: transaction.details, 
                    type: transaction.transactionType, 
                    date: transaction.transactionDate
                }
            }
            return (newTransaction)
        })

        this.addLoadingToLink(button, icon, span)
        let response = await this.uploadTransaction(data, fileName, fileType)
        if(response) this.clickAndDownload(response, fileType)
        
        this.removeLoadingFromLink(button, icon, span, fileType) 
    }

    buildFileName = (type) => {
        let userFirstName = escape(localStorage.getItem("name").split(" ")[0])
        return `${userFirstName}_transactions_${type}`
        
    }

    addLoadingToLink = (button, icon, span) => {
        button.disabled = true
        icon.classList.remove("fa-file-code-o")
        icon.classList.add("fa-spinner", "fa-spin")
        span.innerHTML = "Loading"
    }

    removeLoadingFromLink = (button, icon, span, type) => {
        let iconClass = type === "json" ? "fa-file-code-o" : "fa-file-excel-o"
        button.disabled = false
        icon.classList.add(iconClass)
        icon.classList.remove("fa-spinner")
        icon.classList.remove("fa-spin")
        span.innerHTML = "Download"
    }

    clickAndDownload = (data, fileType) => {
        if(fileType === "json"){
            data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data))
        } else {
            data = `data:text/${fileType};charset=utf-8,` + encodeURIComponent(data)
        }
        let a = document.querySelector("#downloadFileLink")

        a.setAttribute("href", data)
        a.setAttribute("download", `transactions.${fileType}`)
        a.click()
    }

    selectDateFilter = (startDate = null, endDate = null) => {
        if(startDate && endDate){
            this.filterTransactionsWithDate(startDate, endDate)
        } else {
            let {transactions} = this.state
            this.setState({transactionsList: transactions}) 
        }
    }

    filterTransactionsWithDate = (startDate, endDate) => {
        let {transactions} = this.state
        
        transactions = transactions.filter(transaction => {
            let check = true
            check = new Date(transaction.transactionDate) >= new Date(startDate) ? check : false 
            check = new Date(transaction.transactionDate) <= new Date(endDate) ? check : false
            return check 
        })
        this.setState({transactionsList: transactions}) 
    }


    componentDidMount(){
        this.getTransactions()
    }
   
    render(){
        return(
        <React.Fragment>
            <Main icon="money" title={this.translate('TRANSACTIONS_LIST_TITLE')} subtitle={this.translate('TRANSACTIONS_LIST_SUBTITLE')}>
                <div className="p-0 p-md-3 mt-3">
                    <div className="p-1 p-md-3 mt-3">
                        <form className="row ">
                            <div className="form-group col-12 d-flex flex-row">
                                <input onChange={e=>this.filter(e.target.value)} className="form-control flex-grow-1" type="text" placeholder={this.translate('TRANSACTIONS_LIST_FILTER')}/>
                                <div id="filter-icons" className={` ${this.state.transactionsList.length > 0 ? "" : "d-none"}`}>
                                    <DateDropdown onlyIcon={true} dontFirstLoad={true} selectDateFilter={this.selectDateFilter} translate={this.translate} />
                                    <i className="fa fa-download" onClick={()=>this.toogleModal()} aria-hidden="true"></i>
                                </div>
                            </div>
                        </form>
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr className="text-center">
                                        <th># <i onClick={e=>this.sort(e, "order", 0)} name="arrow" className="fa fa-arrow-right"></i></th>
                                        <th>{this.translate('TABLE_DETAILS')} <i onClick={e=>this.sort(e, "details", 1)} name="arrow" className="fa fa-arrow-right"></i></th>
                                        <th>{this.translate('TABLE_AMOUNT')} <i  onClick={e=>this.sort(e, "amount", 2)} name="arrow" className="fa fa-arrow-right"></i></th>
                                        <th>{this.translate('TABLE_CATEGORY')} <i onClick={e=>this.sort(e, "category", 3)} name="arrow" className="fa fa-arrow-right"></i></th>
                                        <th>{this.translate('TABLE_TYPE')} <i onClick={e=>this.sort(e, "transactionType", 4)} name="arrow" className="fa fa-arrow-right"></i></th>
                                        <th>{this.translate('TABLE_DATE')} <i onClick={e=>this.sort(e, "transactionDate", 5)} name="arrow" className="fa fa-arrow-right"></i></th>
                                        <th colSpan="2">{this.translate('TABLE_ACTIONS')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.transactionsList !== null ? (
                                        this.state.transactionsList.length > 0 ? (
                                            this.state.transactionsList.map((transaction)=>
                                            <tr key={transaction._id}>
                                                <td>{transaction.order}</td>
                                                <td>{transaction.details}</td>
                                                <td className={`text-white ${transaction.amount > 0 ? "bg-dark-blue" : "bg-light-red"}`}>
                                                    {transaction.amount}
                                                </td>
                                                <td>{transaction.category}</td>
                                                <td>{transaction.transactionType}</td>
                                                <td>{transaction.transactionDate}</td>
                                                <td><a href={`/transaction/form/${transaction._id}`}><i className="fa fa-edit"></i></a></td>
                                                <td><i onClick={e=>this.deleteTransaction(transaction._id)} className="fa fa-trash"></i></td>
                                            </tr>
                                        )) : (
                                            <tr><td colSpan="7">{this.translate('TRANSACTIONS_NO_TRANSACTIONS')}</td></tr>
                                        )
                                    ) : (
                                        <tr><td colSpan="7">{this.translate('ICON_LOADING')} <i className="fa fa-spinner fa-spin"></i></td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Main>
            <div className="modal" id="modal-export-data" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content bg-dark-blue text-light">
                        <div className="modal-header">
                            <h5 className="modal-title">Export Data</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true"><i className="fa fa-close text-light"></i></span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-12 d-flex py-2">
                                    <span className="flex-grow-1">Download Sheet file(.csv)</span>
                                    <button href="/" className="btn btn-default bg-light-blue text-white download-files-button" onClick={e=>this.downloadTransactionsData(e, "csv")}>
                                        <i className="text-white fa fa-file-excel-o" aria-hidden="true"></i>&nbsp;
                                        <span>Download</span>
                                    </button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 d-flex py-2">
                                    <span className="flex-grow-1">Download Excel file(.xls)</span>
                                    <button href="/" className="btn btn-default bg-dark-green text-white download-files-button" onClick={(e)=>this.downloadTransactionsData(e, "xls")}>
                                        <i className="text-white fa fa-file-excel-o" aria-hidden="true"></i>&nbsp;
                                        <span>Download</span>
                                    </button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 d-flex py-2">
                                    <span className="flex-grow-1">Download JSON file(.json)</span>
                                    <button href="/" className="btn btn-default bg-light-red text-white download-files-button" onClick={(e)=>this.downloadTransactionsData(e, "json")}>
                                        <i className="text-white fa fa-file-code-o" aria-hidden="true"></i>&nbsp;
                                        <span>Download</span>
                                    </button>
                                </div>
                            </div>
                            <a id="downloadFileLink" className="d-none" disabled="disabled" href="/"> </a>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
        )
    }  
}

export default TransactionsList