import "./Auth.css"
import React, {Component} from "react"

import {setStorages, resetStorages} from "../helpers/LocalStorageHelpers"
import axios from "../services/axios"

import Main from "../template/Main"
import Input from "../form/Input"


export default class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: "",
            invalidFields: [0, 0]
        }
        this.translate = this.props.translate
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        resetStorages()
        document.getElementById("loading").style.visibility = 'visible'
        let response = await this.postAccount()
        if(!response){
            document.getElementById("errorStatus").innerHTML = this.translate("SERVER_ERROR")
            document.getElementById("loading").style.visibility = 'hidden'
        } else if(response.data && response.data.success){
            setStorages(response.data)
            this.props.history.push("/transactions")
            window.location.reload()
        } else if (response.data && response.data.errors && response.data.errors.length > 0){
            let serverResponseStatus = response.data.errors[0].state 
            let errorMessage = ""
            if(serverResponseStatus === "incorrect"){
                errorMessage = this.translate("LOGIN_INCORRECT")
            } else if(serverResponseStatus === "inactive") {
                errorMessage = this.translate("LOGIN_INACTIVE_ACCOUNT")
            } else {
                errorMessage = this.translate("LOGIN_NOEXISTENT_ACCOUNT")
            }
            document.getElementById("errorStatus").innerHTML = errorMessage
            document.getElementById("loading").style.visibility = 'hidden'
        } 
    }

    postAccount = async () => {
        let {email, password} = this.state
        let response
        try {
            response = await axios.post("/accounts/signin", {email, password})
        } catch (error) {
            console.log(error)
            response = null
        }
        return response
    }

    checkInputEmpty = input => input.length === 0 ? this.translate('FORM_FIELD_CANT_BE_EMPTY') : ""

    checkErrorStatusEmpty = (fieldPosition, errorStatusEmpty) => {
        let newInvalidFields = this.state.invalidFields
        newInvalidFields[fieldPosition] = errorStatusEmpty === "" ? 1 : 0
        this.setState({newInvalidFields})
    }

    updateEmail = (e) => {
        let email = e.target.value
        e.target.nextSibling.innerHTML = this.checkInputEmpty(email) 
        this.checkErrorStatusEmpty(0, e.target.nextSibling.innerHTML)
        this.setState({email})
    }

    updatePassword = (e) => {
        let password = e.target.value
        e.target.nextSibling.innerHTML = this.checkInputEmpty(password)
        this.checkErrorStatusEmpty(1, e.target.nextSibling.innerHTML)
        this.setState({password})
    }
    
    clearForm = (e) => {
        this.setState({email: "", password: ""})
        for(let i = 0; i < document.getElementsByTagName("small").length; i++){
            document.getElementsByTagName("small")[i].innerHTML = ""
        }
        this.setState({invalidFields: [0, 0]})
    }

    render(){
        return (
            <Main className="form" icon="sign-in" title={this.translate('LOGIN_TITLE')} subtitle={this.translate('LOGIN_SUBTITLE')}>
                <div className="p-3 mt-3">
                <form method="post" onSubmit={e=> this.handleSubmit(e)}>
                    <span className="text-danger" id="errorStatus"></span>
                    <div className="form-group">
                        <label htmlFor="email">{this.translate('FORM_LABEL_EMAIL')}</label>
                        <Input type="email" name="email" placeholder={this.translate('FORM_PLACEHOLDER_EMAIL')} id="email" className="form-control" onChange={(e)=>this.updateEmail(e)} value={this.state.email} />
                        <small className="text-danger"></small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">{this.translate('FORM_LABEL_PASSWORD')}</label>
                        <Input type="password" name="password" placeholder={this.translate('FORM_PLACEHOLDER_PASSWORD')} id="password" className="form-control" value={this.state.password} onChange={(e)=>this.updatePassword(e)} />
                        <small className="text-danger"></small>
                    </div>
                    <div className="form-group">
                        <Input type="reset" className="btn m-2" onClick={e=>this.clearForm()} value={this.translate('FORM_BUTTON_CLEAR')}/>
                        <Input type="submit" className="btn m-2" disabled={this.state.invalidFields.filter((field)=> field).length < 2} value={this.translate('FORM_BUTTON_SUBMIT')}/>
                        <i id="loading" className="fa fa-spinner fa-spin" style={{visibility:"hidden"}}></i>
                    </div>
                </form>
                </div>
            </Main>
        )
    }
} 
