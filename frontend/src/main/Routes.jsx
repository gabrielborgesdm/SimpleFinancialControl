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
import RecoverPassword from "../components/authentication/RecoverPassword"
import Logout from "../components/authentication/Logout"

import translate from "../components/helpers/Translation"
const Router = props => (
    <Switch>
        <Route exact path="/"  render={(props) => <Home {...props} translate={translate}/>} />
        <Route path="/login" render={(props) => <Login {...props} translate={translate}/>} />
        <Route path="/signup" render={(props) => <Signup {...props} translate={translate}/>}/>
        <Route path="/confirmaccount/:token" render={(props) => <ConfirmAccount {...props} translate={translate}/>}/>
        <Route path="/recoverpassword/:token" render={(props) => <RecoverPassword {...props} translate={translate}/>}/>
        <Route path="/recoverpassword" render={(props) => <RecoverPassword {...props} translate={translate}/>}/>
        <PrivateRoute path="/logout" component={Logout} />
        <PrivateRoute path="/transaction/form/:id" component={TransactionForm} />
        <PrivateRoute path="/transaction/form" component={TransactionForm} />
        <PrivateRoute path="/transaction/list" component={TransactionsList} />
        <PrivateRoute path="/transaction" component={Transactions} />
        <Redirect from="*" to="/transaction" />
    </Switch>
)




export default Router;


