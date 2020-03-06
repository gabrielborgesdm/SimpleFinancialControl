import React from "react"
import {Route, Redirect} from "react-router-dom"
const PrivateRoute = ({ component: Component, auth, ...rest }) => 
    <Route
        {...rest}
        render={props => {
            if (auth.isLoading){
                return null
            } else if (!auth.isAuthenticated) {
                return <Redirect to={{ pathname: "/login" }}/>
            } else {
                return <Component {...props} />
            }
        }}                  
    />


export default PrivateRoute