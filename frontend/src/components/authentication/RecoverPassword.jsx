import "./Auth.css"
import React, { Component } from "react"
import { withRouter, Link } from "react-router-dom"

import axios from "../services/axios"

import Main from "../template/Main"
import Input from "../form/Input"

import StrongPasswordBar from "../template/StrongPasswordBar"



class RecoverPassword extends Component {
    constructor(props){
        super(props)
        this.state = {
            activated: null,
            formStatus: {message: " ", className: ""},
            password: "",
            repeatPassword: "",
            showLoginMessage: false,
            showCheckEmailMessage: false,
            email: "",
            securityLevel: 0,
            token: null
        }
        this.translate = this.props.translate
    }

    handleEmailFormSubmit = (e) => {
        e.preventDefault()
        if(this.state.email === "") return
        this.postPasswordRecovery()
    } 

    postPasswordRecovery = async () => {
        let {email} = this.state
        let frontendRecoverURL = window.location.href
        let country = this.getCountryBasedOnLanguage()
        try {
            let response = await axios.post(`/accounts/passwordRecovery`, {frontendRecoverURL, email, country})
            if(response.data.success){
                this.clearEmailForm()
                this.setState({showCheckEmailMessage: true})
            } else {
                if(response.data.errors){
                    let errorMessage = ""
                    if( response.data.errors[0].state === "nonexistent"){
                        errorMessage = this.translate("LOGIN_NOEXISTENT_ACCOUNT")
                    } else {
                        errorMessage = this.translate("LOGIN_INACTIVE_ACCOUNT")
                    }
                    let formStatus = {message: errorMessage, className: "text-danger"}
                    this.setState({formStatus}) 
                } else {
                    
                    let formStatus = {message: this.translate('SERVER_ERROR'), className: "text-warning"}
                    this.setState({formStatus})
                }
            }
            
        } catch (error) {
            console.log(error)
            let formStatus = {message: this.translate('SERVER_ERROR'), className: "text-warning"}
            this.setState({formStatus})
        }
    } 

    clearEmailForm = () => {
        this.setState({email: "", formStatus: {message: " ", className: ""}})
    }

    getCountryBasedOnLanguage = () => {
        let language = window.navigator.userLanguage || window.navigator.language
        let country = language.includes("pt") ? "brazil" : "usa"
        return country
    }

    handleRecoverPasswordFormSubmit = (e) => {
        e.preventDefault()
        if(!this.checkPasswordFormIsValid()) return
        this.postUpdatedPasswords()
    }

    checkPasswordFormIsValid = () =>{
        let {password, repeatPassword, securityLevel} = this.state
        let check = true
        if(password === "") check = false
        if(repeatPassword === "") check = false
        if(password !== repeatPassword) check = false
        if(securityLevel < 2) check = false
        return check
    }

    postUpdatedPasswords = async () => {
        let {password, token} = this.state
        if(!token) return
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        try {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
            let response = await axios.post(`/accounts/recoverPassword`, {password})
            console.log(response)
            if(response.data.success){
               this.clearPasswordForm()
               this.setState({showLoginMessage: true})
            } else {
                let formStatus = {message: this.translate('RECOVER_PASSWORD_NOT_POSSIBLE_TO_CHANGE_PASSWORD'), className: "text-danger"}
                this.setState({formStatus})
            }
            
        } catch (error) {
            console.log(error)
            let formStatus = {message: this.translate('RECOVER_PASSWORD_NOT_POSSIBLE_TO_CHANGE_PASSWORD'), className: "text-danger"}
            this.setState({formStatus})
        }
    } 

    updatePassword = (e) => {
        let password = e.target.value
        if(password === "") {
            e.target.nextSibling.innerHTML = this.translate('FORM_FIELD_CANT_BE_EMPTY')
        } else if(password !== "" && password.length <= 5){
            e.target.nextSibling.innerHTML = this.translate('FORM_PASSWORD_MUST_HAVE_MORE_THAN_SIX_CHAR') 
        } else {
            e.target.nextSibling.innerHTML = ""
        }
        
        let repeatPasswordSmall = document.querySelector("#repeat-password-small")

        if(password !== this.state.repeatPassword){
            repeatPasswordSmall = document.querySelector("#repeat-password-small")
            repeatPasswordSmall.innerHTML = this.translate('FORM_PASSWORD_MUST_BE_THE_SAME')
        } else {
            repeatPasswordSmall.innerHTML = ""
        }

        this.setState({password})
    }

    updateRepeatPassword = (e) => {
        let repeatPassword = e.target.value

        if(repeatPassword === "") {
            e.target.nextSibling.innerHTML = this.translate('FORM_FIELD_CANT_BE_EMPTY')
        } else if(repeatPassword !== "" && this.state.password !== repeatPassword){
            e.target.nextSibling.innerHTML = this.translate('FORM_PASSWORD_MUST_BE_THE_SAME') 
        } else {
            e.target.nextSibling.innerHTML = ""
        }
        this.setState({repeatPassword})
    }

    updateSecurityLevel = (securityLevel) => {
        if(this.state.password !== "" && securityLevel < 2) {
            document.querySelector("#password-small").innerHTML = this.translate('FORM_PASSWORD_IS_INSECURE')
        }
        this.setState({securityLevel})
    }
    
    clearPasswordForm = () => {
        this.setState({password: "", repeatPassword: "", formStatus: {message: " ", className: ""}})
    }

    componentDidMount(){
        
        let token = this.props.match.params.token
        this.setState({token})
    }

    render = () =>
        <Main className="form" icon="sign-in" title={this.translate('RECOVER_PASSWORD_TITLE')} subtitle={this.translate('RECOVER_PASSWORD_SUBTITLE')}>
            <div className="p-3 mt-3">
                {this.state.token ? (
                    <React.Fragment>
                        <form method="post" className={`${this.state.showLoginMessage ? "d-none" : "d-block"}`} onSubmit={e=> this.handleRecoverPasswordFormSubmit(e)}>
                            <span className={this.state.formStatus.className} id="errorStatus">{this.state.formStatus.message}</span>
                            
                            <div className="form-group">
                                <label htmlFor="password">{this.translate('RECOVER_PASSWORD_NEW_PASSWORD')}</label>
                                <Input type="password" name="password" placeholder={this.translate('FORM_PLACEHOLDER_PASSWORD')} id="password" className="form-control" value={this.state.password} onChange={(e)=>this.updatePassword(e)} />
                                <small id="password-small"className="text-danger"></small>
                            </div>

                            
                            <div className="form-group">
                                <label htmlFor="repeat_password">{this.translate('FORM_LABEL_REPEAT_THE_PASSWORD')}</label>
                                <Input type="password" name="repeat_password" placeholder={this.translate('FORM_PLACEHOLDER_PASSWORD')} id="repeat_password" className="form-control" value={this.state.repeatPassword} onChange={(e)=>this.updateRepeatPassword(e)} />
                                <small id="repeat-password-small" className="text-danger"></small>
                            </div>
                            
                            <StrongPasswordBar translate={this.translate} password={this.state.password} updateSecurityLevel={this.updateSecurityLevel} />

                            <div className="form-group">
                                <Input type="reset" className="btn m-2" onClick={e=>this.clearPasswordForm()} value={this.translate('FORM_BUTTON_CLEAR')}/>
                                <Input type="submit" className="btn m-2" disabled={this.checkPasswordFormIsValid() ? "" : "disabled"}  value={this.translate('FORM_BUTTON_SUBMIT')}/>
                                <i id="loading" className="fa fa-spinner fa-spin" style={{visibility:"hidden"}}></i>
                            </div>
                        </form>
                        <div className={`col-12 ${this.state.showLoginMessage ? "d-block" : "d-none"}`}>
                            <h3>{this.translate('RECOVER_PASSWORD_PASSWORD_UPDATED_WITH_SUCCESS_DO_YOU_WANT_LOGIN')}</h3>
                            <Link className="text-dark-green" to={"/login"}><i className="fa fa-external-link"></i> {this.translate('LOGIN_SUBTITLE')}</Link>
                        </div>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <form method="post" className={`${this.state.showCheckEmailMessage ? "d-none" : "d-block"}`} onSubmit={e=> this.handleEmailFormSubmit(e)}>
                            <span className={this.state.formStatus.className} id="errorStatus">{this.state.formStatus.message}</span>
                            <div className="form-group">
                                <label htmlFor="email">{this.translate('FORM_LABEL_EMAIL')}</label>
                                <Input type="email" name="email" placeholder={this.translate('FORM_PLACEHOLDER_EMAIL')} id="email" className="form-control" onChange={(e)=>this.setState({email: e.target.value})} value={this.state.email} />
                                <small className="text-danger"></small>
                            </div>
                            <div className="form-group">
                                <Input type="reset" className="btn m-2" onClick={e=>this.clearEmailForm()} value={this.translate('FORM_BUTTON_CLEAR')}/>
                                <Input type="submit" className="btn m-2" disabled={this.state.email.length === 0 ? "disabled" : ""}  value={this.translate('FORM_BUTTON_SUBMIT')}/>
                                <i id="loading" className="fa fa-spinner fa-spin" style={{visibility:"hidden"}}></i>
                            </div>
                        </form>
                        <div className={`col-12 ${this.state.showCheckEmailMessage ? "d-block" : "d-none"}`}>
                            <h3>{this.translate('RECOVER_PASSWORD_ACCESS_EMAIL_TO_RECOVER_PASSWORD')}</h3>
                        </div>
                    </React.Fragment>
                    
                )}    
            </div>
        </Main>
    
} 

export default withRouter(RecoverPassword)


