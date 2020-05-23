import "./Auth.css"
import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import Main from "../template/Main"


const ConfirmAccount = (props) => {
    const [activated, setActivated] = useState(null)
    const [error, setError] = useState("")
    const { token } = useParams()

    useEffect(() => {

        const url = `${process.env.REACT_APP_API_BASE_URL}/accounts/confirmEmail/${token}`
        axios.get(url)
        .then(response => {
            if(response.data.success){
                setActivated(true)
            } else{
                setActivated(false)
                setError(response.data.errors[0].message)
            }
            console.log(response)
        })
        .catch(error => {
            setActivated(false)
            setError("Something went wrong")
        })
    }, [token])

    const showActivationStatus = () => {
        if(activated == null) {
            return (
                <React.Fragment>
                    <h1>Activating account</h1>
                    <p>Loading <i id="loading" className="fa fa-spinner fa-spin"></i></p>
                </React.Fragment>
            )
        } else if(activated) {
            return(
                <React.Fragment>
                    <h2 className="pb-1 text-dark">Account activated with success</h2 >
                    <Link className="text-dark-green" to={"/login"}><i className="fa fa-external-link"></i> Log in</Link>
                </React.Fragment>
            )
        } else {
            return(
                <React.Fragment>
                    <h2 className="pb-1 text-dark">Ops!</h2   >
                    <p>{error}</p>
                    <Link className="text-dark-green" to={"/signup"}><i className="fa fa-external-link"></i> Sign up</Link>
                </React.Fragment>
            )
        }
    } 

    return (
        <Main className="form" icon="sign-in" title="Account Activation" subtitle="You will be able to use your account after its activation">
            <div className="p-3 mt-3">
                {showActivationStatus()}    
            </div>
        </Main>
    )
} 

export default ConfirmAccount
    

