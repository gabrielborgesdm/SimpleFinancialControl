import "./Nav.css"
import React from "react"
import NavItem from "./NavItem.jsx"

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <NavItem href="/" icons="fa fa-home">Home</NavItem>
            <NavItem href="/transaction" icons="fa fa-money">Transactions</NavItem>
        </nav>
    </aside>