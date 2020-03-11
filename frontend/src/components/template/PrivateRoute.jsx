import React, { useState } from "react"
import {Route, Redirect} from "react-router-dom"
import authenticate from "../authentication/authenticate"

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [token] = useState(localStorage.getItem("Token"))
    authenticate()
    return (
        <Route
            {...rest}
            render={props=> 
                token ? 
                <Component {...props} /> :  
                <Redirect to={{pathname: '/login', state: { from: props.location }}} /> 
            }         
        />
    )
}

export default PrivateRoute