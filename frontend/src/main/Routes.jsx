import React from "react"
import { Switch, Route, Redirect} from "react-router"
import PrivateRoute from "../components/template/PrivateRoute"
import Home from "../components/template/Home"
import TransactionForm from "../components/transaction/TransactionForm"
import TransactionsList from "../components/transaction/TransactionsList"
import Transactions from "../components/transaction/Transactions"
import Login from "../components/authentication/Login"
import Signup from "../components/authentication/Signup"
import ConfirmAccount from "../components/authentication/ConfirmAccount"
import Logout from "../components/authentication/Logout"

import translate from "../components/helpers/Translation"
const Router = props => (
    <Switch>
        <Route exact path="/"  render={(props) => <Home {...props} translate={translate}/>} />
        <Route path="/login" render={(props) => <Login {...props} translate={translate}/>} />
        <Route path="/signup" render={(props) => <Signup {...props} translate={translate}/>}/>
        <Route path="/logout" component={Logout} />
        <Route path="/confirmaccount/:token" component={ConfirmAccount} />
        <PrivateRoute path="/transaction/form/:id" component={TransactionForm} />
        <PrivateRoute path="/transaction/form" component={TransactionForm} />
        <PrivateRoute path="/transaction/list" component={TransactionsList} />
        <PrivateRoute path="/transaction" component={Transactions} />
        <Redirect from="*" to="/" />
    </Switch>
)




export default Router;


