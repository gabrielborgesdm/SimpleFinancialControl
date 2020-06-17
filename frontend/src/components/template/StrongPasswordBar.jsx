
import React, { Component } from "react"

export default class Signup extends Component{
    constructor(props){
        super(props)
        this.state = {
            securityLevel: 0
        }
        this.translate = this.props.translate
    }

    checkPasswordSecurityLevel = () => {
        let {password} = this.props
        let securityLevel = 0
        password = String(password)
        if(password.length > 5) {
            if(password.match(/\d+/g)) securityLevel ++
            if(password.match(/[`!@#$%^&*()_+\-={};':"\\|,.<>?~]/)) securityLevel ++
            if(password.match(/[abcdefghijklmnopqrstuvwxyz]/)) securityLevel ++
            if(password.match(/[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/)) securityLevel ++
        }
        this.setState({securityLevel})
        this.props.updateSecurityLevel(securityLevel)
    }
    
    componentDidMount(){
        this.checkPasswordSecurityLevel()
    }
    componentDidUpdate(prevProps){
        if(prevProps.password !== this.props.password){
            this.checkPasswordSecurityLevel()
        }
    }
    render(){
        return (
            <div className="form-group">
                <div className="progress" style={{height: 30}}>
                    <div className={`progress-bar ${this.state.securityLevel > 0 ? "" : "d-none"}`} style={{width:"25%", backgroundColor: "#a24936"}}>
                        {this.translate('STRONG_PASSWORD_INSECURE')}
                    </div>
                    <div className={`progress-bar ${this.state.securityLevel > 1 ? "" : "d-none"}`} style={{width:"25%", backgroundColor: "#F9EA9A"}}>
                        {this.translate('STRONG_PASSWORD_WEAK')}
                    </div>
                    <div className={`progress-bar ${this.state.securityLevel > 2 ? "" : "d-none"}`} style={{width:"25%", backgroundColor: "#3F8D73"}}>
                        {this.translate('STRONG_PASSWORD_MEDIUM')}
                    </div>
                    <div className={`progress-bar ${this.state.securityLevel > 3 ? "" : "d-none"}`} style={{width:"25%", backgroundColor: "#86f075"}}>
                        {this.translate('STRONG_PASSWORD_STRONG')}
                    </div>
                </div>
            </div>
        )
    }
} 
    
