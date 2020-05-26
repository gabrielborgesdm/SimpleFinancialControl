import "./Nav.css"
import NavItem from "./NavItem"
import React, { Component } from "react"
class Nav extends Component {
    constructor(props){
        super(props)
        this.state = {
            token: localStorage.getItem("Token")
        }
        this.translate = this.props.translate
    }
    render(){
        return (
        <aside className="menu-area">
            <nav className="menu">
                {!this.state.token ? (
                    <React.Fragment>
                        <NavItem href="/" icons="fa fa-home">
                            <span className="d-none d-sm-inline"> {this.translate('NAV_HOME')}</span>
                        </NavItem>
                        <NavItem href="/login" icons="fa fa-sign-in">
                        <span className="d-none d-sm-inline"> {this.translate('NAV_LOGIN')}</span>
                        </NavItem>
                        <NavItem href="/signup" icons="fa fa-user-plus">
                            <span className="d-none d-sm-inline"> {this.translate('NAV_SIGNUP')}</span>
                        </NavItem>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <NavItem href="/transaction" icons="fa fa-money">
                            <span className="d-none d-sm-inline"> {this.translate('NAV_TRANSACTIONS')}</span>
                        </NavItem>
                        <NavItem href="/transaction/form" icons="fa fa-plus">
                            <span className="d-none d-sm-inline"> {this.translate('NAV_ADD_TRANSACTIONS')}</span>
                        </NavItem>
                        <NavItem href="/logout" icons="fa fa-sign-out text-danger">
                            <span className="d-none d-sm-inline"> {this.translate('NAV_LOGOUT')}</span>
                        </NavItem>
                    </React.Fragment>
                )}            
            </nav>
        </aside>
        )
    }
}
    


export default Nav
