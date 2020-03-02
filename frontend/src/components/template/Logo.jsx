import logo from "../../assets/images/logo.png"
import "./Logo.css"
import React from "react"
import { Link } from "react-router-dom"
export default props =>
    <aside className="logo">
        <Link to="/">
            <img src={logo} alt="logo"/>
        </Link>
    </aside>