import "./Auth.css"
import React, { Component } from "react"
import { Link } from "react-router-dom"
import axios from "../services/axios"
import Main from "../template/Main"
import { withRouter } from "react-router-dom"


class ConfirmAccount extends Component {
    constructor(props){
        super(props)
        this.state = {
            activated: null,
            error: "",
            token: null
        }
        this.translate = this.props.translate
    }

    getConfirmEmail = async () => {
        let token = this.props.match.params.token
        let response = null
        try {
            response = await axios.get(`/accounts/confirmEmail/${token}`)
        } catch (error) {
            console.log(error)
        }

        let {activated, error} = this.state
        if(response && response.data.success){
            console.log(response.data)
            activated = true
        } else if(response){
            activated = false
            error = this.translate('CONFIRM_ACCOUNT_DENIED')
        } else {
            activated = false
            error = this.translate('SERVER_ERROR')
        }
       this.setState({activated, error})
    }
    componentDidMount(){
        this.getConfirmEmail()
    }

    showActivationStatus = () => {
        if(this.state.activated == null) {
            return (
                <React.Fragment>
                    <h1>{this.translate('CONFIRM_ACCOUNT_ACTIVATING_ACCOUNT')}</h1>
                    <p>{this.translate('ICON_LOADING')} <i id="loading" className="fa fa-spinner fa-spin"></i></p>
                </React.Fragment>
            )
        } else if(this.state.activated) {
            return(
                <React.Fragment>
                    <h2 className="pb-1 text-dark">{this.translate('CONFIRM_ACCOUNT_ACTIVATED_ACCOUNT')}</h2 >
                    <Link className="text-dark-green" to={"/login"}><i className="fa fa-external-link"></i> {this.translate('CONFIRM_ACCOUNT_LOGIN')}</Link>
                </React.Fragment>
            )
        } else {
            return(
                <React.Fragment>
                    <h2 className="pb-1 text-dark">{this.translate('CONFIRM_ACCOUNT_SOMETHING_WENT_WRONG')}</h2>
                    <p>{this.state.error}</p>
                    <Link className="text-dark-green" to={"/signup"}><i className="fa fa-external-link"></i> {this.translate('CONFIRM_ACCOUNT_SIGNUP')}</Link>
                </React.Fragment>
            )
        }
    } 

    render = () =>
        <Main className="form" icon="sign-in" title={this.translate('CONFIRM_ACCOUNT_ACCOUNT_TITLE')} subtitle={this.translate('CONFIRM_ACCOUNT_ACCOUNT_SUBTITLE')}>
            <div className="p-3 mt-3">
                {this.showActivationStatus()}    
            </div>
        </Main>
    
} 

export default withRouter(ConfirmAccount)


