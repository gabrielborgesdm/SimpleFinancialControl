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
            password: "",
            repeatedPassword: "",
            token: null,
            statusMessage: "",
            statusType: "warning",
        }
    }


    checkField = (fieldName, ...values) => {
        let validate
        let check = true
        
        if(fieldName === "email") validate = validateEmail(values[0])
        else if(fieldName === "password") validate = validatePassword(values[0])
        else if(fieldName === "repeatedPassword") validate = validateRepeatedPassword(values[0], values[1])
        
        if(!validate.status){
            check = false
            let statusMessage = validate.messages[0]
            this.setState({ statusMessage })
        }

        return check
    }

    clearForm = () => {
        this.setState({
            password: "",
            repeatedPassword: "",
        })
    }

    checkEmptyFields = () => {
        let emptyFields = false
        let {email, password, repeatedPassword} = this.state
        
        emptyFields = password ? emptyFields : true
        emptyFields = repeatedPassword ? emptyFields : true
        
        return emptyFields
    }

    handleRecoverPassword = async () => {

        if (this.checkEmptyFields()) return
        
        Keyboard.dismiss()

        let { password, repeatedPassword, token } = this.state

        console.log(password, repeatedPassword)

        if (!this.checkField("password", password)) return
        if (!this.checkField("repeatedPassword", password, repeatedPassword)) return

        let response = await this.postRecoverPassword(password, token)
        this.handleRecoverPasswordResponse(response) 
    }

    postRecoverPassword = async (password, token) => {
        let response
        try {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
            response = await axios.post("/accounts/recoverPassword", {password})

        } catch (error) {
            response = null
        }
        return response
    }

    handleRecoverPasswordResponse = (response) => {
        let {statusMessage, statusType} = this.state
        const { navigate } = this.props.navigation
        statusType = "warning"
        if(!response) statusMessage = translate('SERVER_ERROR')
        else if(response.data && response.data.success){
            navigate('signIn', {statusMessage: {success: true, message: translate("RECOVER_PASSWORD_PASSWORD_UPDATED_WITH_SUCCESS")}})
            this.clearForm()
        } else {
            statusMessage = translate("RECOVER_PASSWORD_PASSWORD_UPDATED_WITH_SUCCESS_DO_YOU_WANT_LOGIN")
        }
        this.setState({statusType, statusMessage})
    }

    componentDidMount = () => {
        if(this.props.route.params && this.props.route.params.token){
            this.setState({token: this.props.route.params.token, statusMessage: ""}, 
            ()=>this.props.navigation.setParams({token: null}))
        }
    }

    componentDidUpdate = () => {
        if(this.props.route.params && this.props.route.params.token){
            this.setState({token: this.props.route.params.token, statusMessage: ""}, 
            ()=>this.props.navigation.setParams({token: null}))
        }
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
                        <FontAwesomeIcon style={minimalistInputIcon} icon={faLock} />
                        <TextInput 
                            placeholder={translate("FORM_LABEL_PASSWORD")}
                            clearTextOnFocus={true}
                            secureTextEntry={true}
                            defaultValue={this.state.password}
                            onChangeText={text=>this.setState({password: text})}
                            style={minimalistInputControl}
                        ></TextInput>
                    </View>

                    <View style={minimalistInputGroup}>
                        <FontAwesomeIcon style={minimalistInputIcon} icon={faLock} />
                        <TextInput 
                            placeholder={translate("FORM_LABEL_REPEAT_THE_PASSWORD")}
                            clearTextOnFocus={true}
                            autoCapitalize="none"
                            autoCorrect={false}
                            autoCompleteType="password"
                            autoCorrect={false}
                            secureTextEntry={true}
                            defaultValue={this.state.repeatedPassword}
                            onChangeText={text=>this.setState({repeatedPassword: text})}
                            style={minimalistInputControl}
                        ></TextInput>
                    </View>
            
                    <View style={[minimalistInputGroup]}>
                        <TouchableOpacity onPress={this.handleRecoverPassword} disabled={this.checkEmptyFields("passwords")} style={[ buttonMinimalist, bgYellow, this.checkEmptyFields("passwords") ? opacityLow : opacityHigh]}>
                            <Text style={[textDarkGrey]}>{translate("RECOVER_PASSWORD_TITLE")}</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </LinearGradient>     
    )
    
} 