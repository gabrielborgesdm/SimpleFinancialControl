import React, { Component } from "react"
import LinearGradient from 'react-native-linear-gradient'

import axios from "../../services/axios"
import { translate } from "../../helpers/TranslationHelpers"

import { styles, colors } from "../../../assets/Styles"
const { lightBlue, lightGreen } = colors
const { flex1 } = styles

export default class ConfirmAccount extends Component {

    activateAccount = async (token = null) => {
        const { navigate } = this.props.navigation
        let response = null
        let success = false
        let message = ""
        if(token){
            try {
                response = await axios.get(`/accounts/confirmEmail/${token}`)
                if(response && response.data.success){
                    success = true
                    message = translate("CONFIRM_ACCOUNT_ACTIVATED_ACCOUNT")
                } else if(response){
                    success = false
                    message = translate("CONFIRM_ACCOUNT_DENIED")
                } else {
                    success = false
                    message = translate('SERVER_ERROR')
                }
            } catch (error) {
                success = false
                message = translate('SERVER_ERROR')
                console.log(error)
            }
        } else {
            message = translate("CONFIRM_ACCOUNT_ACTIVATION_LINK_INVALID")
        }
        navigate('signIn', {statusMessage: {success, message}})
        
    }

    componentDidMount = () => {
        const { route } = this.props
        let token
        if(route.params && route.params.token) token = route.params.token
        this.activateAccount(token)
    }

    render = () => (
        <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 2}} colors={[ lightBlue, lightGreen]} style={[flex1]}>
        </LinearGradient>   
    )
    
} 