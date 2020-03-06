import "./Nav.css"
import React from "react"
import NavItem from "./NavItem.jsx"



const Nav = props => 
    <aside className="menu-area">
        <nav className="menu">
            <NavItem href="/" icons="fa fa-home">Home</NavItem>
            <NavItem href="/login" icons="fa fa-sign-in">Login</NavItem>
            <NavItem href="/transaction" icons="fa fa-money">Transactions</NavItem>
            <NavItem href="/transaction/form" icons="fa fa-money">Add Transaction</NavItem>
            <NavItem href="/logout" icons="fa fa-sign-out text-danger">Logout</NavItem>
        </nav>
    </aside>


export default Nav