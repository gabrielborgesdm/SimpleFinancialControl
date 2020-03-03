import React from "react"

import Main from "../template/Main"
import TransactionForm from "./TransactionForm"

const headerProps = {
    icon: "money",
    title: "Transactions",
    subtitle: "Manage your Transactions"
}


const TransactionsCrud = () => {

    return(
        <Main {...headerProps}>
            <TransactionForm />
        </Main>
    )  
}

export default TransactionsCrud