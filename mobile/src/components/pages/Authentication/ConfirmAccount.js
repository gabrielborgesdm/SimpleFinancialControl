import React, { Component } from "react"
import { View, Text, KeyboardAvoidingView, TextInput, Image, TouchableOpacity, ScrollView, Keyboard} from "react-native"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser, faEnvelope, faLock, faCheckCircle, faCircle } from '@fortawesome/free-solid-svg-icons'
import LinearGradient from 'react-native-linear-gradient'

import axios from "../../services/axios"
import { validateEmail, validatePassword, validateRepeatedPassword } from "../../helpers/ValidationHelpers"
import { translate, getDisplayLanguage } from "../../helpers/TranslationHelpers"
import {WEBSITE_URL} from "react-native-dotenv"
import Popup from "../../templates/Popup"
import {setStorages} from "../../helpers/StorageHelpers"
import ShortLogo from "../../../assets/img/short-logo2.png"
import { styles, colors } from "../../../assets/Styles"
const { lightBlue, lightGreen } = colors
const { h1, h4, h3, mt5, mb3, flex1, textBold, textUnderline, bgYellow, minimalistInputControl, minimalistRadioControl, minimalistRadioGroup, minimalistInputIcon, lightGreyLogoImage,
minimalistInputGroup, textCenter, textDarkGrey, buttonMinimalist, mr1, signUpContainer, alignCenter, my2,mb4, my4, opacityHigh, opacityLow
} = styles

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