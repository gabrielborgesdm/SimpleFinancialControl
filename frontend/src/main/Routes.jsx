import React from "react"
import { Switch, Route, Redirect} from "react-router"
import PrivateRoute from "../components/template/PrivateRoute"
import Home from "../components/template/Home"
import TransactionForm from "../components/transaction/TransactionForm"
import TransactionList from "../components/transaction/TransactionList"
import Login from "../components/authentication/Login"
import Logout from "../components/authentication/Logout"

const Router = props => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <PrivateRoute path="/transaction/form/:id" component={TransactionForm} />
        <PrivateRoute path="/transaction/form" component={TransactionForm} />
        <PrivateRoute path="/transaction" component={TransactionList} />
        <Redirect from="*" to="/" />
    </Switch>
)




export default Router;


