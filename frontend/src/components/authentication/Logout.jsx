import React, { Component } from "react"
import Main from "../template/Main"
import LocalStorageHelpers from "../helpers/LocalStorageHelpers"

export default class Logout extends Component {
    constructor(props){
        super(props)
        this.translate = this.props.translate
    }
    
    handleYes = () => {
        LocalStorageHelpers.resetStorages()
        this.props.history.push("/")
        window.location.reload()
    }

    render = () => 
        <Main  icon="sign-out" title={this.translate('TRANSACTIONS_LOGOUT_TITLE')} subtitle={this.translate('TRANSACTIONS_LOGOUT_SUBTITLE')}>
            <div className="p-3 mt-3">
                <div>
                    <h1 className="lead">{this.translate('TRANSACTIONS_LOGOUT_ARE_YOU_SURE_YOU_WANT_TO_LEAVE')}</h1>
                    <button onClick={e=>this.handleYes()} className="btn my-1 btn-outline-danger">{this.translate('TRANSACTIONS_LOGOUT_YES')}</button>
                </div>
            </div>
        </Main>
} 
    

