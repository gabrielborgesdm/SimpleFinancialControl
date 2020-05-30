import "./Auth.css"
import React, { Component } from "react"
import axios from "../services/axios"
import Main from "../template/Main"
import Input from "../form/Input"

import {resetStorages} from "../helpers/LocalStorageHelpers"


export default class Signup extends Component{
    constructor(props){
        super(props)
        this.state = {
            name: "",
            email: "",
            country: "",
            password: "",
            invalidFields: [0, 0, 0],
        }
        this.translate = this.props.translate
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        resetStorages()
        document.getElementById("loading").style.visibility = 'visible'
        let response = await this.postAccount()
        
        if(!response){
            document.getElementById("errorStatus").innerHTML = this.translate('SERVER_ERROR')
        } else if(response.data && response.data.success){
            document.getElementById("errorStatus").classList.remove("text-danger")
            document.getElementById("errorStatus").classList.add("text-success")
            document.getElementById("errorStatus").innerHTML = this.translate("SIGNUP_SUCCESS")
        } else if (response.data && response.data.errors){

            document.getElementById("errorStatus").classList.remove("text-success")
            document.getElementById("errorStatus").classList.add("text-danger")
            let serverResponseStatus = response.data.errors[0].state 
            let errorMessage = ""
            if(serverResponseStatus === "in_use"){
                errorMessage = this.translate("SIGNUP_IN_USE")
            } else {
                errorMessage = this.translate("SIGNUP_COULDNT_CREATE")
            }
            document.getElementById("errorStatus").innerHTML = errorMessage
        }
        document.getElementById("loading").style.visibility = 'hidden'
    }

    postAccount = async () => {
        let confirmAccountUrl = window.location.href.replace("signup", "confirmaccount")
        let {name, email, password, country} = this.state
        let response
        try {
            response = await axios.post("/accounts/signup", {name, email, password, country, confirmAccountUrl})
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
        this.setState({invalidFields: newInvalidFields})
    }

    updateName = (e) => {
        let name = e.target.value
        e.target.nextSibling.innerHTML = this.checkInputEmpty(name) 
        this.checkErrorStatusEmpty(0, e.target.nextSibling.innerHTML)
        this.setState({name})
    }

    updateEmail = (e) => {
        let email = e.target.value
        e.target.nextSibling.innerHTML = this.checkInputEmpty(email) 
        this.checkErrorStatusEmpty(1, e.target.nextSibling.innerHTML)
        this.setState({email})
    }
    
    updateCountry = (e) => {
        let country = e.target.value
        if (country !== "usa" && country !== "brazil") country = ""
        e.target.nextSibling.innerHTML = this.checkInputEmpty(country) 
        this.checkErrorStatusEmpty(2, e.target.nextSibling.innerHTML)
        this.setState({country})
    }

    updatePassword = (e) => {
        let password = e.target.value
        e.target.nextSibling.innerHTML = this.checkInputEmpty(password)
        this.checkErrorStatusEmpty(3, e.target.nextSibling.innerHTML)
        this.setState({password})
    }
    
    clearForm = (e) => {
        this.setState({
            name: "",
            email: "",
            country: "",
            password: "",
            invalidFields: [0, 0, 0]
        })
        for(let i = 0; i < document.getElementsByTagName("small").length; i++){
            document.getElementsByTagName("small")[i].innerHTML = ""
        }
    }
    render(){
        return (
            <Main className="form" icon="user-plus" title={this.translate('SIGNUP_TITLE')} subtitle={this.translate('SIGNUP_SUBTITLE')}>
                <div className="p-3 mt-3">
                    <form method="post" onSubmit={e=> this.handleSubmit(e)}>
                        <span className="text-danger" id="errorStatus"></span>
                        <div className="form-group">
                            <label htmlFor="name">{this.translate('FORM_LABEL_NAME')}</label>
                            <Input type="text" name="name" placeholder={this.translate('FORM_PLACEHOLDER_NAME')} id="name" className="form-control" onChange={(e)=>this.updateName(e)} value={this.state.name} />
                            <small className="text-danger"></small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">{this.translate('FORM_LABEL_EMAIL')}</label>
                            <Input type="email" name="email" placeholder={this.translate('FORM_PLACEHOLDER_EMAIL')} id="email" className="form-control" onChange={(e)=>this.updateEmail(e)} value={this.state.email} />
                            <small className="text-danger"></small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="country"></label>
                            <select name="country" id="country" className="form-control" onChange={(e)=>this.updateCountry(e)} value={this.state.country} >
                                <option value="" defaultValue>{this.translate('FORM_LABEL_COUNTRY')}</option>
                                <option value="brazil">{this.translate('FORM_OPTION_BRAZIL')}</option>
                                <option value="usa">{this.translate('FORM_OPTION_USA')}</option>
                            </select>
                            <small className="text-danger">&nbsp;</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">{this.translate('FORM_LABEL_PASSWORD')}</label>
                            <Input type="password" name="password" placeholder={this.translate('FORM_PLACEHOLDER_PASSWORD')} id="password" className="form-control" onChange={(e)=>this.updatePassword(e)} value={this.state.password} />
                            <small className="text-danger"></small>
                        </div>
                        <div className="form-group">
                            <Input type="reset" className="btn m-2" onClick={e=>this.clearForm()} value={this.translate('FORM_BUTTON_CLEAR')}/>
                            <Input type="submit" className="btn m-2" disabled={this.state.invalidFields.filter((field)=> field).length < 4} value={this.translate('FORM_BUTTON_SUBMIT')}/>
                            <i id="loading" className="fa fa-spinner fa-spin" style={{visibility:"hidden"}}></i>
                        </div>
                    </form>
                </div>
            </Main>
        )
    }
} 
    
