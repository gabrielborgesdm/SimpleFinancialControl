import "./TransactionList.css"
import ReactDOM from "react-dom"
import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Link } from "react-router-dom"
import axios from "axios"
import Main from "../template/Main"

const token = localStorage.getItem("Token")
const baseUrl = process.env.REACT_APP_API_BASE_URL
axios.defaults.headers["Authorization"] = `Bearer ${token}`

const TransactionsList = () => {
    const [transactions, setTransactions] = useState(-1)

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

    useEffect(()=> {
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

        let list
        if(transactions === -1){
            list = (
            <tr>
                <td colSpan="5">
                    Loading transactions&nbsp;
                    <i id="loading" className="fa fa-spinner fa-spin"></i>
                </td>
            </tr>
            )
        } else if(transactions.length === 0){
            list = (
                <tr>
                    <td colSpan="5">
                        There aren't any transactions
                    </td>
                </tr>
            )
        } else {
            list = (
                transactions.map(transaction =>
                    <tr key={transaction._id}>
                        <td>{transaction.amount}</td>
                        <td>{transaction.details}</td>
                        <td>{transaction.transactionType}</td>
                        <td>{new Date(transaction.transactionDate).toISOString().split('T')[0]}</td>
                        <td className="d-flex justify-content-around">
                            <span>
                                <Router>
                                    <Link to={`/transaction/form/${transaction._id}`}> <i className="action fa fa-edit"></i></Link>
                                </Router>
                            </span>
                            <span onClick={e => deleteTransaction(e, transaction._id)}> 
                                <i className="action fa fa-trash"></i>
                            </span>
                        </td>
                    </tr>      
                )
            )
        }
        ReactDOM.render(list, document.getElementById("transactionsBody"))
    }, [transactions])

    

    const sort = (e, type, elementIndex) => { 
        const turnArrowsToRight = (elementIndex) => {
            let arrows = document.getElementsByName("arrow")
            for(let i = 0; i < arrows.length; i++){
                if (i !== elementIndex) arrows[i].className = "fa fa-arrow-right"
            }  
        }

        let newTransactions = transactions
        turnArrowsToRight(elementIndex)
        if (e.target.className === "fa fa-arrow-down" ){
            e.target.className = "fa fa-arrow-up"
            
            newTransactions = newTransactions.slice(0).sort((a, b) => a[type] >= b[type] ? 1 : 0)
        } else{
            e.target.className = "fa fa-arrow-down"
            newTransactions = newTransactions.slice(0).sort((a, b) => a[type] < b[type] ? 1 : 0)
        }
        setTransactions(newTransactions)
    }
    
    return(
        <Main icon="money" title="Transactions" subtitle="List your Transactions">
            <table className="table table table-striped">
                <thead> 
                    <tr>
                        <th>Amount&nbsp;<i onClick={e => sort(e, "amount", 0)} name="arrow" className="fa fa-arrow-right"></i></th>
                        <th>Details&nbsp;<i onClick={e => sort(e, "details", 1)} name="arrow" className="fa fa-arrow-right"></i></th>
                        <th>Type&nbsp;<i onClick={e => sort(e, "transactionType", 2)} name="arrow" className="fa fa-arrow-right"></i></th>
                        <th>Date&nbsp;<i onClick={e => sort(e, "transactionDate", 3)} name="arrow" className="fa fa-arrow-right"></i></th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody id="transactionsBody"></tbody>
            </table>
        </Main>
    )  
}

export default TransactionsList