import "./Nav.css"
import React, { useState } from "react"
import NavItem from "./NavItem"
const Nav = props => {
    const [token] = useState(localStorage.getItem("Token"))

    return (
    <aside className="menu-area">
        <nav className="menu">
            <NavItem href="/" icons="fa fa-home">Home</NavItem>
            {!token ? (
                <React.Fragment>
                    <NavItem href="/login" icons="fa fa-sign-in">Login</NavItem>
                    <NavItem href="/signup" icons="fa fa-sign-in">Signup</NavItem>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <NavItem href="/transaction" icons="fa fa-money">Transactions</NavItem>
                    <NavItem href="/transaction/form" icons="fa fa-money">Add Transaction</NavItem>
                    <NavItem href="/logout" icons="fa fa-sign-out text-danger">Logout</NavItem>
                </React.Fragment>
            )}            
        </nav>
    </aside>
    )
}
    


export default Nav
