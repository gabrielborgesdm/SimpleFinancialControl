import React from "react"
import {
    Switch,
    Route,
    Redirect
} from "react-router"

import Home from "../components/home/Home"
import TransactionCrud from "../components/transaction/TransactionCrud"

export default props =>
<Switch>
    <Route exact path="/" component={Home} />
    <Route path="/transaction" component={TransactionCrud} />
<Redirect from="*" to="/" />
</Switch>