import "./NavItem.css"
import React from "react"
import { Link } from "react-router-dom"

export default props =>

<Link className="nav-items" to={props.href}>
    <i className={ props.icons }></i>
    &nbsp;{props.children}
</Link>