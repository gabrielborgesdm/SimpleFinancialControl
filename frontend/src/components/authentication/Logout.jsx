import React from "react"
import Main from "../template/Main"
import LocalStorageHelpers from "../helpers/LocalStorageHelpers"

const Logout = (props) => {

    const handleYes = () => {
        LocalStorageHelpers.resetStorages()
        props.history.push("/")
        window.location.reload()
    }

    return (
        <Main  icon="sign-out" title="Logout" subtitle="Log out your account">
            <div className="p-3 mt-3">
                <div>
                    <h1 className="lead">Are you sure you want to sign out of your account? </h1>
                    <button onClick={e=>handleYes()} className="btn my-1 btn-outline-danger">YES</button>
                </div>
            </div>
        </Main>
    )
} 

export default Logout
    

