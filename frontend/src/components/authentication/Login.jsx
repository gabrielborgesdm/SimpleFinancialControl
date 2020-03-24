import "./Auth.css"
import React, { useState } from "react"
import axios from "axios"
import Main from "../template/Main"
import Input from "../form/Input"


const Login = (props) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [invalidFields, setInvalidFields] = useState([0, 0])

    const submitForm = (e) => {
        e.preventDefault()
        localStorage.setItem("Token", "")
        document.getElementById("loading").style.visibility = 'visible'
        const url = `${process.env.REACT_APP_API_BASE_URL}/accounts/signin`
        axios.post(url, {email, password})
        .then(response => {
            if(response.data.success){
                localStorage.setItem("Token", response.data.token)
                props.history.push("/transactions")
                window.location.reload()
            } else{
                document.getElementById("errorStatus").innerHTML = response.data.errors[0].message
                document.getElementById("loading").style.visibility = 'hidden'
            }
        })
        .catch(error => {
            console.log(error)
            document.getElementById("errorStatus").innerHTML = "Something went wrong with the server"
            document.getElementById("loading").style.visibility = 'hidden'
        })
    }
    const checkInputEmpty = input => input.length === 0 ? "Field can't be empty" : ""

    const checkErrorStatusEmpty = (fieldPosition, errorStatusEmpty) => {
        let newInvalidFields = invalidFields
        newInvalidFields[fieldPosition] = errorStatusEmpty === "" ? 1 : 0
        setInvalidFields(newInvalidFields)
    }

    const updateEmail = (e) => {
        let email = e.target.value
        e.target.nextSibling.innerHTML = checkInputEmpty(email) 
        checkErrorStatusEmpty(0, e.target.nextSibling.innerHTML)
        setEmail(email)
    }

    const updatePassword = (e) => {
        let password = e.target.value
        e.target.nextSibling.innerHTML = checkInputEmpty(password)
        checkErrorStatusEmpty(1, e.target.nextSibling.innerHTML)
        setPassword(password)
    }
    
    const clearForm = (e) => {
        setEmail("")
        setPassword("")
        for(let i = 0; i < document.getElementsByTagName("small").length; i++){
            document.getElementsByTagName("small")[i].innerHTML = ""
        }
        setInvalidFields([0, 0])
    }

    return (
        <Main className="form" icon="sign-in" title="Login" subtitle="Log in your account">
            <div className="p-3 mt-3">
            <form method="post" onSubmit={e=> submitForm(e)}>
                <span className="text-danger" id="errorStatus"></span>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Input type="email" name="email" id="email" className="form-control" onChange={(e)=>updateEmail(e)} value={email} />
                    <small className="text-danger"></small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Input type="password" name="password" id="password" className="form-control" value={password} onChange={(e)=>updatePassword(e)} />
                    <small className="text-danger"></small>
                </div>
                <div className="form-group">
                    <Input type="reset" className="btn m-2" onClick={e=>clearForm()} value="Clear"/>
                    <Input type="submit" className="btn m-2" disabled={invalidFields.filter((field)=> field).length < 2} value="Submit"/>
                    <i id="loading" className="fa fa-spinner fa-spin" style={{visibility:"hidden"}}></i>
                </div>
            </form>
            </div>
        </Main>
    )
} 

export default Login
    

