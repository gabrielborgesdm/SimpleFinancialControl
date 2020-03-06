import React, {useEffect, useState} from "react"
import PrivateRoute from "./PrivateRoute"
import Authenticate  from "./Auth.js"
import {
    Switch,
    Route,
    Redirect
} from "react-router"

import Home from "../components/home/Home"
import TransactionForm from "../components/transaction/TransactionForm"
import TransactionList from "../components/transaction/TransactionList"
import Login from "../components/authentication/Login"
import Logout from "../components/authentication/Logout"
const auth = Authenticate()

const Router = props => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <PrivateRoute path="/transaction/form/:id" auth={auth} component={TransactionForm} />
        <PrivateRoute path="/transaction/form" auth={auth} component={TransactionForm} />
        <PrivateRoute path="/transaction" auth={auth} component={TransactionList} />
        <Redirect from="*" to="/" />
    </Switch>
)




export default Router;


