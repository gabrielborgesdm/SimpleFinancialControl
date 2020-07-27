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


export default class SignIn extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: "",
            statusMessage: "",
            statusType: "warning",
        }
    }
    
    checkSignInEmptyFields = () => {
        let emptyFields = false
        let {email, password} = this.state

        emptyFields = email ? emptyFields : true
        emptyFields = password ? emptyFields : true

        return emptyFields
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

    validateSignInFields = (email) => {
        let checkIsValid = true
        if (!this.checkField("email", email)) checkIsValid = false

        if(checkIsValid) this.setState({statusMessage: ""})
        return checkIsValid
    }   

    clearStatusMessage = () => this.setState({statusType: "warning", statusMessage: ""})

    handleSignInSubmit = async () => {

        if (this.checkSignInEmptyFields()) return
        
        Keyboard.dismiss()
        
        let { email, password} = this.state
        
        if(!this.validateSignInFields(email)) return

        let response = await this.postSignIn(email, password)
        this.handlePostSignInResponse(response) 
    }

    postSignIn = async (email, password) => {
        let response
        try {
            response = await axios.post("/accounts/signin", {email, password})
        } catch (error) {
            response = null
        }
        return response
    }

    showConfirmAccountStatus = (statusMessage) => {
        this.setState({
            statusMessage: statusMessage.message,
            statusType: statusMessage.success ? "success" : "warning"
        }, this.props.navigation.setParams({statusMessage: null}))

    }

    componentDidMount = () => {
        if(this.props.route.params && this.props.route.params.statusMessage){
            this.showConfirmAccountStatus(this.props.route.params.statusMessage)
        }
    }

    componentDidUpdate = () => {
        if(this.props.route.params && this.props.route.params.statusMessage){
            this.showConfirmAccountStatus(this.props.route.params.statusMessage)
        }
    }

    handlePostSignInResponse = async (response) => {
        let {statusMessage, statusType} = this.state
        statusType = "warning"

        if(!response) statusMessage = translate('SERVER_ERROR')
        else if(response.data && response.data.success){
            let check = await setStorages(response.data)
            if(check) {
                this.props.navigation.navigate("home")
                return
            } else statusMessage = translate("SERVER_ERROR")
        } else if (response.data && response.data.errors){
            let serverResponseStatus = response.data.errors[0].state 
            if(serverResponseStatus === "incorrect") statusMessage = translate("SIGNIN_INCORRECT")
            else if(serverResponseStatus === "inactive") statusMessage = translate("SIGNIN_INACTIVE_ACCOUNT")
            else statusMessage = translate("SIGNIN_NOEXISTENT_ACCOUNT")
        }
        this.setState({statusType, statusMessage})
    }

    render = () => (
        <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 2}} colors={[ lightBlue, lightGreen]} style={[flex1]}>
            <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={[flex1, { justifyContent: "center"}]}>
                <KeyboardAvoidingView style={{width: "100%"}}>
                    <Popup type={this.state.statusType} message={this.state.statusMessage} clearStatusMessage={this.clearStatusMessage} />
                    <Text style={[h1,textCenter, textDarkGrey]}>{translate('SIGNIN_TITLE')}</Text>
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

                    <View style={minimalistInputGroup}>
                        <FontAwesomeIcon style={minimalistInputIcon} icon={faLock} />
                        <TextInput 
                            placeholder={translate("FORM_LABEL_PASSWORD")}
                            autoCapitalize="none"
                            autoCorrect={false}
                            autoCompleteType="password"
                            autoCorrect={false}
                            secureTextEntry={true}
                            defaultValue={this.state.password}
                            onChangeText={text=>this.setState({password: text})}
                            style={minimalistInputControl}
                            ></TextInput>
                    </View>
                    <View style={[minimalistInputGroup, mb3]}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate("passwordRecoveryEmail")}>
                            <Text style={[textDarkGrey, textBold, textUnderline]}>{translate("FORGOT_YOUR_PASSWORD")}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[minimalistInputGroup]}>
                        <TouchableOpacity onPress={this.handleSignInSubmit} disabled={this.checkSignInEmptyFields()} style={[ buttonMinimalist, bgYellow, this.checkSignInEmptyFields() ? opacityLow : opacityHigh]}>
                            <Text style={[textDarkGrey]}>{translate("SIGN_IN")}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[minimalistInputGroup], {justifyContent: "center", alignItems: "center", paddingTop: 20}}>
                        <Text style={[textDarkGrey, h4]}>{translate("DOESNT_HAVE_AN_ACCOUNT")}</Text>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate("signUp")}>
                            <Text style={[textDarkGrey, h3, textBold, textUnderline]}>{translate("SIGN_UP")}</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </LinearGradient>   
    )
    
} 