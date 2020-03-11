import "./Nav.css"
import React, { useState } from "react"
import NavItem from "./NavItem"
const Nav = props => {
    const [token] = useState(localStorage.getItem("Token"))

    return (
    <aside className="menu-area">
        <nav className="menu">
            <NavItem href="/" icons="fa fa-home">
                <span className="d-none d-sm-inline">Home</span>
            </NavItem>
            {!token ? (
                <React.Fragment>
                    <NavItem href="/login" icons="fa fa-sign-in">
                    <span className="d-none d-sm-inline">Login</span>
                    </NavItem>
                    <NavItem href="/signup" icons="fa fa-user-plus">
                        <span className="d-none d-sm-inline">Sign up</span>
                    </NavItem>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <NavItem href="/transaction" icons="fa fa-money">
                        <span className="d-none d-sm-inline">Transactions</span>
                    </NavItem>
                    <NavItem href="/transaction/form" icons="fa fa-plus">
                        <span className="d-none d-sm-inline">Add Transaction</span>
                    </NavItem>
                    <NavItem href="/logout" icons="fa fa-sign-out text-danger">
                        <span className="d-none d-sm-inline">Logout</span>
                    </NavItem>
                </React.Fragment>
            )}            
        </nav>
    </aside>
    )
}
    


export default Nav
