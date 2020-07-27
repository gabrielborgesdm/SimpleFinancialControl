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

export default class RecoverPassword extends Component {

    constructor(props){
        super(props)
        this.state = {
            email: "",
            country: getDisplayLanguage() === "pt_BR" ? "brazil" : "usa",
            statusMessage: "",
            statusType: "warning",
        }
    }


    checkField = (fieldName, ...values) => {
        let validate
        let check = true
        
        if(fieldName === "email") validate = validateEmail(values[0])
        
        if(!validate.status){
            check = false
            let statusMessage = validate.messages[0]
            this.setState({ statusMessage })
        }

        return check
    }

    clearForm = () => {
        this.setState({
            email: "",
        })
    }

    checkEmptyFields = () => {
        let emptyFields = false
        let {email} = this.state
        
        emptyFields = email ? emptyFields : true

        return emptyFields
    }

    handleSendRecoveryEmail = async () => {

        if (this.checkEmptyFields()) return
        
        Keyboard.dismiss()

        let { email, country } = this.state

        if (!this.checkField("email", email)) return

        let response = await this.postSendRecoveryEmail(email, country)
        this.handleSendRecoveryEmailResponse(response) 
    }

    postSendRecoveryEmail = async (email, country) => {
        let response
        try {
            response = await axios.post("/accounts/passwordRecovery", {email, country, frontendRecoverURL: `${WEBSITE_URL}/recoverpassword`})

        } catch (error) {
            response = null
        }
        return response
    }

    handleSendRecoveryEmailResponse = (response) => {
        let {statusMessage, statusType} = this.state
        statusType = "warning"

        if(!response) statusMessage = translate('SERVER_ERROR')
        else if(response.data && response.data.success){
            statusType = "success"
            statusMessage = translate("RECOVER_PASSWORD_ACCESS_EMAIL_TO_RECOVER_PASSWORD")
            this.clearForm()
        } else if (response.data && response.data.errors){

            let serverResponseStatus = response.data.errors[0].state 
            if(serverResponseStatus === "nonexistent") statusMessage = translate("LOGIN_NOEXISTENT_ACCOUNT")
            else statusMessage = translate("LOGIN_INACTIVE_ACCOUNT")
        }
        this.setState({statusType, statusMessage})
    }

    render = () => (
        <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 2}} colors={[ lightBlue, lightGreen]} style={[flex1]}>
            <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={[flex1, { justifyContent: "center"}]}>
                <KeyboardAvoidingView style={{width: "100%"}}>
                    <Popup type={this.state.statusType} message={this.state.statusMessage} clearStatusMessage={this.clearStatusMessage} />
                    <Text style={[h1,textCenter, textDarkGrey]}>{translate('RECOVER_PASSWORD_TITLE')}</Text>
                    <View style={mt5}>
                        <Image source={ShortLogo} style={lightGreyLogoImage} />
                    </View>

                    <View style={minimalistInputGroup}>
                        <FontAwesomeIcon style={minimalistInputIcon} icon={faEnvelope} />
                        <TextInput 
                            placeholder={translate('FORM_LABEL_EMAIL')}
                            autoCapitalize="none"
                            autoCompleteType="email"
                            keyboardType="email-address"
                            autoCorrect={false}
                            textContentType="emailAddress" 
                            defaultValue={this.state.email}
                            onChangeText={text=>this.setState({email: text})}
                            style={minimalistInputControl}
                        ></TextInput>
                    </View>
                    
                    <View style={[minimalistInputGroup]}>
                        <TouchableOpacity onPress={this.handleSendRecoveryEmail} disabled={this.checkEmptyFields()} style={[ buttonMinimalist, bgYellow, this.checkEmptyFields() ? opacityLow : opacityHigh]}>
                            <Text style={[textDarkGrey]}>{translate("SEND_RECOVERY_EMAIL")}</Text>
                        </TouchableOpacity>
                    </View>
                        
                </KeyboardAvoidingView>
            </ScrollView>
        </LinearGradient>     
    )
    
} 