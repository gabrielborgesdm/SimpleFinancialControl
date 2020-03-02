import React, { useState, useEffect } from "react"
import axios from "axios"

import Main from "../template/Main"
import TransactionForm from "./TransactionForm"

const headerProps = {
    icon: "money",
    title: "Transactions",
    subtitle: "Manage your Transactions"
}

const token = ["testando"]
const baseUrl = "testando"
axios.defaults.headers["Authorization"] = `Bearer ${token}`



const TransactionsCrud = () => {
    const [transaction, setTransaction] = useState({})


    const submitForm = (e) => {
        e.preventDefault()
        const method = transaction.id ? "put" : "post"
        const url = transaction.id ? `${baseUrl}/${transaction.id}` : baseUrl
        console.log(url)
        axios[method](url, transaction)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
          })
    }
    
    const updateFields = (e) => {
        let newTransaction = transaction
        newTransaction[e.target.name] = e.target.value
        setTransaction(newTransaction)
    }

    const formProps = {
        transaction,
        updateFields,
        submitForm,
    }

    return(
        <Main {...headerProps}>
            <TransactionForm {...formProps} />
        </Main>
    )  
}

export default TransactionsCrud