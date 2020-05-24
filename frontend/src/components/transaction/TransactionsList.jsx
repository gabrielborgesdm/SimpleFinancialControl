import "./TransactionsList.css"
import React, { Component } from "react"
import axios from "axios"
import Main from "../template/Main"
import CountryHelpers from "../helpers/CountryHelpers"

const token = localStorage.getItem("Token")
const baseUrl = process.env.REACT_APP_API_BASE_URL
axios.defaults.headers["Authorization"] = `Bearer ${token}`

class TransactionsList extends Component{
    constructor(props){
        super(props)
        this.state = {
            transactions: [],
            transactionsList: []
        }
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

    deleteTransaction = (id) => {
        if (!window.confirm("Are you sure you want to delete this record?")) return
        axios.delete(`${process.env.REACT_APP_API_BASE_URL}/transaction/${id}`)
        .then(response => {
            if(response.data.success){
                let newTransactions = this.state.transactions
                newTransactions = newTransactions.filter((transaction)=>transaction._id !== id)
                this.setState({transactions:newTransactions})
                this.buildTransactionsTable(newTransactions)
            } else {
                alert(response.data.errors[0].message)
            }
        })
        .catch(error => console.log(error))
    }

    abstractObjectFromTransactionsQuery(query){
        let transactions = []
        Object.values(query).forEach((queryElement, index)=>{
            let {_id, amount, category, details, transactionType, transactionDate} = queryElement
            transactionDate = new Date(transactionDate).toISOString().split('T')[0] 
            details = details || "No description"
            let transaction = {order: index + 1, _id, amount, category, details, transactionType, transactionDate}
            transactions.push(transaction)
        })
        return transactions
    }
    componentDidMount(){
        axios.get(`${baseUrl}/transaction`)
        .then(response => {
            if(response.data.success){
                let transactions = this.abstractObjectFromTransactionsQuery(response.data.transactions)
                this.setState({transactions: transactions}) 
                this.buildTransactionsTable(transactions)
            }
        })
        .catch(error => console.log(error)) 
    }
   
    render(){
        return(
        <Main icon="money" title="Transactions" subtitle="List your Transactions">
            <div className="p-0 p-md-3 mt-3">
                <div className="p-1 p-md-3 mt-3">
                    <form className="row ">
                        <div className="form-group col-12">
                            <input onKeyUp={e=>this.filter(e.target.value)} className="form-control" type="text" placeholder="Filter"/>
                        </div>
                    </form>
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr className="text-center">
                                    <th># <i onClick={e=>this.sort(e, "order", 0)} name="arrow" className="fa fa-arrow-right"></i></th>
                                    <th>Details <i onClick={e=>this.sort(e, "details", 1)} name="arrow" className="fa fa-arrow-right"></i></th>
                                    <th>Amount <i  onClick={e=>this.sort(e, "amount", 2)} name="arrow" className="fa fa-arrow-right"></i></th>
                                    <th>Category <i onClick={e=>this.sort(e, "category", 3)} name="arrow" className="fa fa-arrow-right"></i></th>
                                    <th>Type <i onClick={e=>this.sort(e, "transactionType", 4)} name="arrow" className="fa fa-arrow-right"></i></th>
                                    <th>Date <i onClick={e=>this.sort(e, "transactionDate", 5)} name="arrow" className="fa fa-arrow-right"></i></th>
                                    <th colSpan="2">Actions</th>
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
                                                {CountryHelpers.getFormattedCoinText(transaction.amount)}
                                            </td>
                                            <td>{transaction.category}</td>
                                            <td>{transaction.transactionType}</td>
                                            <td>{transaction.transactionDate}</td>
                                            <td><a href={`/transaction/form/${transaction._id}`}><i className="fa fa-edit"></i></a></td>
                                            <td><i onClick={e=>this.deleteTransaction(transaction._id)} className="fa fa-trash"></i></td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan="7">There aren't any transactions</td></tr>
                                    )
                                ) : (
                                    <tr><td colSpan="7">Loading <i className="fa fa-spinner fa-spin"></i></td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Main>)
    }  
}

export default TransactionsList