import "./TransactionList.css"
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import Main from "../template/Main"

const token = localStorage.getItem("Token")
const baseUrl = process.env.REACT_APP_API_BASE_URL
axios.defaults.headers["Authorization"] = `Bearer ${token}`

const TransactionsCrud = () => {
    const [transactions, setTransactions] = useState(null)

    useEffect(() => {
        const url = `${baseUrl}/transaction`
        axios.get(url)
        .then(response => {
            if(response.data.success){
                setTransactions(response.data.transactions)
            }
        })
        .catch(error => {
            console.log(url, error)
        })
    }, [])

    const loadTransactions = () => {
        let list
        if (transactions == null) {
            list = <tr>
                <td colSpan="5">
                    Loading transactions&nbsp;
                    <i id="loading" className="fa fa-spinner fa-spin"></i>
                </td>
            </tr>
        } else if (transactions.length === 0) {
            list = <tr>
                <td colSpan="5">
                    There aren't any transactions
                </td>
            </tr>
        } else {
            list = transactions.map(transaction =>
                <tr key={transaction._id}>
                    <td>{transaction.amount}</td>
                    <td>{transaction.details}</td>
                    <td>{transaction.transactionType}</td>
                    <td>{new Date(transaction.transactionDate).toISOString().split('T')[0]}</td>
                    <td className="d-flex justify-content-around">
                        <span>
                            <Link to={`/transaction/form/${transaction._id}`}> <i className="action fa fa-edit"></i></Link>
                        </span>
                        <span onClick={e => deleteTransaction(e, transaction._id)}> 
                            <i className="action fa fa-trash"></i>
                        </span>
                    </td>
                </tr>      
            )
        }
        return list
    }
    const deleteTransaction = (e, id) => {
        axios.delete(`${process.env.REACT_APP_API_BASE_URL}/transaction/${id}`)
        .then(response => {
            if(response.data.success){
                let newTransactions = transactions
                newTransactions = newTransactions.filter((transaction)=>transaction._id !== id)
                setTransactions(newTransactions)
            } else {
                alert(response.data.errors[0].message)
            }
        })
        .catch(error => {
            alert("Sorry, something went wrong.")
        })
    } 
    
    return(
        <Main icon="money" title="Transactions" subtitle="List your Transactions">
            <table className="table table table-striped">
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Details</th>
                        <th>Type</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                { loadTransactions() }
                </tbody>
            </table>
        </Main>
    )  
}

export default TransactionsCrud