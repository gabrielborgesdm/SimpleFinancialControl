import React, { Component } from "react"
import { View, Text, KeyboardAvoidingView, TextInput, Image, TouchableOpacity, ScrollView, Keyboard} from "react-native"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEnvelope, faShare } from '@fortawesome/free-solid-svg-icons'
import LinearGradient from 'react-native-linear-gradient'

import {getAxiosInstance} from "../../services/axios"
import { validateEmail } from "../../helpers/ValidationHelpers"
import { translate, getDisplayLanguage } from "../../helpers/TranslationHelpers"
import {WEBSITE_URL} from "react-native-dotenv"
import Popup from "../../templates/Popup"
import LoadingIcon from "../../templates/LoadingIcon"
import ShortLogo from "../../../assets/img/short-logo2.png"
import { styles, colors } from "../../../assets/Styles"
const { lightBlue, lightGreen } = colors
const { h1, textLg, my5, my3, mb5, flex1, bgYellow, minimalistInputControl, minimalistInputIcon, lightGreyLogoImage,
minimalistInputGroup, textCenter, textDarkGrey, buttonMinimalist, opacityHigh, opacityLow, textJustify
} = styles

export default class RecoverPassword extends Component {

    constructor(props){
        super(props)
        this.state = {
            email: "",
            country: getDisplayLanguage() === "pt_BR" ? "brazil" : "usa",
            statusMessage: "",
            statusType: "warning",
            isLoadingRequest: false
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
            this.setState({isLoadingRequest: true})
            let axios = await getAxiosInstance()
            response = await axios.post("/accounts/passwordRecovery", {email, country, frontendRecoverURL: `${WEBSITE_URL}/recoverpassword`})

        } catch (error) {
            response = null
        }
        this.setState({isLoadingRequest: false})
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
            <Popup type={this.state.statusType} message={this.state.statusMessage} clearStatusMessage={this.clearStatusMessage} />
            <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={[flex1, { justifyContent: "center"}]}>
                <KeyboardAvoidingView style={{width: "100%"}}>
                    <Text style={[h1,textCenter, textDarkGrey, mb5]}>{translate('RECOVER_PASSWORD_TITLE')}</Text>
                    <View style={my5}>
                        <Image source={ShortLogo} style={lightGreyLogoImage} />
                    </View>

                    <View style={[minimalistInputGroup]}>
                        <Text style={[textDarkGrey, textLg, textJustify, my3]}>{translate("RECOVER_PASSWORD_INSTRUCTIONS")}</Text>
                    </View>
                    <View style={[minimalistInputGroup]}>
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
                        {this.state.isLoadingRequest ?
                            <TouchableOpacity onPress={this.handleSignInSubmit} disabled={true} style={[ buttonMinimalist, bgYellow, opacityLow]}>
                                <LoadingIcon />
                                <Text style={[textDarkGrey]}>  {translate("ICON_LOADING")}</Text>
                            </TouchableOpacity>
                        :
                            <TouchableOpacity onPress={this.handleSendRecoveryEmail} disabled={this.checkEmptyFields()} style={[ buttonMinimalist, bgYellow, this.checkEmptyFields() ? opacityLow : opacityHigh]}>
                                <FontAwesomeIcon icon={faShare} />
                                <Text style={textDarkGrey}>  {translate("SEND_RECOVERY_EMAIL")}</Text>
                            </TouchableOpacity>
                        }
                    </View>
                        
                </KeyboardAvoidingView>
            </ScrollView>
        </LinearGradient>     
    )
    
} 