import React from "react"
import { Switch, Route, Redirect} from "react-router"
import PrivateRoute from "../components/template/PrivateRoute"
import Home from "../components/template/Home"
import TransactionForm from "../components/transaction/TransactionForm"
import TransactionsList from "../components/transaction/TransactionsList"
import Login from "../components/authentication/Login"
import Signup from "../components/authentication/Signup"
import ConfirmAccount from "../components/authentication/ConfirmAccount"
import Logout from "../components/authentication/Logout"

const Router = props => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/logout" component={Logout} />
        <Route path="/confirmaccount/:token" component={ConfirmAccount} />
        <PrivateRoute path="/transaction/form/:id" component={TransactionForm} />
        <PrivateRoute path="/transaction/form" component={TransactionForm} />
        <PrivateRoute path="/transaction" component={TransactionsList} />
        <Redirect from="*" to="/" />
    </Switch>
)




export default Router;


