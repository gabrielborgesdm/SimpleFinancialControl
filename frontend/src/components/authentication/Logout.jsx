import React from "react"
import Main from "../template/Main"

const Logout = (props) => {

    const handleYes = () => {
        localStorage.removeItem("Token")
        props.history.push("/")
        window.location.reload()
    }

    return (
        <Main  icon="sign-out" title="Logout" subtitle="Log out your account">
            <div>
                <h1 className="lead">Are you sure you want to sign out of your account? </h1>
                <button onClick={e=>handleYes()} className="btn my-1 btn-outline-danger">YES</button>
            </div>
        </Main>
    )
} 

export default Logout
    

