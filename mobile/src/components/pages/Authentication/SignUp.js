import React, { Component } from "react"
import { View, Text, KeyboardAvoidingView, TextInput, Image, TouchableOpacity, ScrollView} from "react-native"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser, faEnvelope, faLock, faCheckCircle, faCircle } from '@fortawesome/free-solid-svg-icons'

import axios from "../../services/axios"
import { validateEmail, validatePassword, validateRepeatedPassword } from "../../helpers/ValidationHelpers"
import { translate, getDisplayLanguage } from "../../helpers/TranslationHelpers"
import {WEBSITE_URL} from "react-native-dotenv"
import Popup from "../../templates/Popup"
import ShortLogo from "../../../assets/img/short-logo2.png"
import { styles } from "../../../assets/Styles"
const { h1, bgYellow, minimalistInputControl, minimalistRadioControl, flex1, minimalistRadioGroup, minimalistInputIcon, lightGreyLogoImage,
minimalistInputGroup, textCenter, textDarkGrey, buttonMinimalist, mr1, signUpContainer, alignCenter, my2,mb4, my4, opacityHigh, opacityLow
} = styles


export default class SignUp extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: "",
            email: "",
            password: "",
            repeatedPassword: "",
            country: getDisplayLanguage() === "pt_BR" ? "brazil" : "usa",
            statusMessage: "",
            statusType: "warning",
        }
    }
    
    checkSignUpEmptyFields = () => {
        let emptyFields = false
        let {name, email, password, repeatedPassword, country} = this.state

        emptyFields = name ? emptyFields : true
        emptyFields = email ? emptyFields : true
        emptyFields = password ? emptyFields : true
        emptyFields = repeatedPassword ? emptyFields : true
        emptyFields = country ? emptyFields : true

        return emptyFields
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

    validateSignUpFields = (email, password, repeatedPassword) => {
        let checkIsValid = true
        if (!this.checkField("email", email)) checkIsValid = false
        if (!this.checkField("password", password, repeatedPassword)) checkIsValid = false
        if (!this.checkField("repeatedPassword", password, repeatedPassword)) checkIsValid = false

        if(checkIsValid) this.setState({statusMessage: ""})
        return checkIsValid
    }   

    clearStatusMessage = () => this.setState({statusType: "warning", statusMessage: ""})

    handleSignUpSubmit = async () => {

        if (this.checkSignUpEmptyFields()) return
        
        let { name, email, password, repeatedPassword, country} = this.state

        
        if(!this.validateSignUpFields(email, password, repeatedPassword)) return

        let response = await this.postAccount(name, email, password, country)
        this.handlePostAccountResponse(response) 
    }

    postAccount = async (name, email, password, country) => {
        let confirmAccountUrl = `${WEBSITE_URL}/confirmaccount`
        let response
        try {
            response = await axios.post("/accounts/signup", {name, email, password, country, confirmAccountUrl})
            console.log(response, confirmAccountUrl)

        } catch (error) {
            console.log("teste", confirmAccountUrl, error)
            response = null
        }
        return response
    }

    handlePostAccountResponse = (response) => {
        let {statusMessage, statusType} = this.state
        statusType = "warning"

        if(!response) statusMessage = translate('SERVER_ERROR')
        else if(response.data && response.data.success){

            statusType = "success"
            statusMessage = translate("SIGNUP_SUCCESS")
            this.clearForm()
        } else if (response.data && response.data.errors){

            let serverResponseStatus = response.data.errors[0].state 
            if(serverResponseStatus === "in_use") statusMessage = translate("SIGNUP_IN_USE")
            else statusMessage = translate("SIGNUP_COULDNT_CREATE")
        }
        this.setState({statusType, statusMessage})
    }

    clearForm = () => {
        this.setState({
            name: "",
            email: "",
            password: "",
            repeatedPassword: "",
            country: getDisplayLanguage() === "pt_BR" ? "brazil" : "usa",
        })
    }

    
    render = () => (
        <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={signUpContainer}>
            <KeyboardAvoidingView style={{width: "100%"}}>
                <Popup type={this.state.statusType} message={this.state.statusMessage} clearStatusMessage={this.clearStatusMessage} />
                <Text style={[h1, mb4, textCenter, textDarkGrey]}>{translate('SIGNUP_TITLE')}</Text>
                <View style={my4}>
                    <Image source={ShortLogo} style={lightGreyLogoImage} />
                </View>
                <View style={minimalistInputGroup}>
                    <FontAwesomeIcon style={minimalistInputIcon} icon={faUser} />
                    <TextInput 
                        placeholder={translate('FORM_FULLNAME')}
                        autoCompleteType="name"
                        textContentType="name" 
                        defaultValue={this.state.name}
                        style={minimalistInputControl}
                        onChangeText={text=>this.setState({name: text})}
                        ></TextInput>
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
                <View style={minimalistInputGroup}>
                    <FontAwesomeIcon style={minimalistInputIcon} icon={faLock} />
                    <TextInput 
                        placeholder={translate("FORM_LABEL_REPEAT_THE_PASSWORD")}
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
                <View style={minimalistRadioGroup}>
                    <TouchableOpacity style={minimalistRadioControl} onPress={()=>this.setState({country: "brazil"})}>
                        <FontAwesomeIcon icon={this.state.country === "brazil" ? faCheckCircle : faCircle } style={[mr1, alignCenter, textDarkGrey]} />
                        <Text style={textDarkGrey}>{translate("FORM_OPTION_BRAZIL")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={minimalistRadioControl} onPress={()=>this.setState({country: "usa"})}>
                        <FontAwesomeIcon icon={this.state.country === "usa" ? faCheckCircle : faCircle }  style={[mr1, alignCenter, textDarkGrey]} />
                        <Text style={textDarkGrey}>{translate("FORM_OPTION_USA")}</Text>
                    </TouchableOpacity>
                </View>
                <View style={[minimalistInputGroup]}>
                    <TouchableOpacity onPress={this.handleSignUpSubmit} disabled={this.checkSignUpEmptyFields()} style={[ buttonMinimalist, bgYellow, this.checkSignUpEmptyFields() ? opacityLow : opacityHigh]}>
                        <Text style={[textDarkGrey]}>{translate("CREATE_ACCOUNT")}</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
    
} 