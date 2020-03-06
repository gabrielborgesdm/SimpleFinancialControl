import "./TransactionList.css"
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import Main from "../template/Main"

const token = process.env.REACT_APP_TOKEN
const baseUrl = process.env.REACT_APP_API_BASE_URL
axios.defaults.headers["Authorization"] = `Bearer ${token}`

const TransactionsCrud = () => {
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        const url = `${baseUrl}/transactions`
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

    const deleteTransaction = (e, id) => {
        console.log(id)
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
                { transactions.map(transaction =>{
                    return(
                    <tr key={transaction._id}>
                        <td>{transaction.amount}</td>
                        <td>{transaction.details}</td>
                        <td>{transaction.transactionType}</td>
                        <td>{transaction.transactionDate}</td>
                        <td className="d-flex justify-content-around">
                            <span>
                                <Link to={`/transaction/form/${transaction._id}`}> <i className="action fa fa-edit"></i></Link>
                            </span>
                            <span onClick={e => deleteTransaction(e, transaction._id)}> 
                                <i className="action fa fa-trash"></i>
                            </span>
                        </td>
                    </tr>
                )}) }
                </tbody>
            </table>
        </Main>
    )  
}

export default TransactionsCrud