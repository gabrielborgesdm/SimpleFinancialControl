import React, { Component } from "react"
import { View, Text, KeyboardAvoidingView, TextInput, Image, TouchableOpacity, ScrollView} from "react-native"
import LinearGradient from 'react-native-linear-gradient'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser, faEnvelope, faLock, faCheckCircle, faCircle } from '@fortawesome/free-solid-svg-icons'

import { translate, getDisplayLanguage } from "../../helpers/TranslationHelpers"
import { validateEmail, validatePassword, validateRepeatedPassword } from "../../helpers/ValidationHelpers"
import Popup from "../../templates/Popup"
import ShortLogo from "../../../assets/img/short-logo2.png"
import { styles, colors, dimensions } from "../../../assets/Styles"
const { h1, minimalistInputControl, minimalistRadioControl, minimalistRadioGroup, minimalistInputIcon, lightGreyLogoView, lightGreyLogoImage,
minimalistInputGroup, textCenter, textDarkGrey, buttonGradient, mr1, dNone, dFlex, alignCenter, my2, flex1, opacityHigh, opacityLow
} = styles

const { quarterWidth } = dimensions
const {lightBlue, lightGreen, lightGrey} = colors

export default class SignUp extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: "",
            email: "",
            password: "",
            repeatedPassword: "",
            country: getDisplayLanguage() === "pt_BR" ? "brazil" : "usa",
            errorMessage: "",
        }
    }
    
    handleSignUpSubmit = () => {
        if (this.checkSignUpEmptyFields()) return
        
        let { name, email, password, repeatedPassword, country} = this.state
        
        if (!this.checkField("email", email)) return
        if (!this.checkField("password", password, repeatedPassword)) return
        if (!this.checkField("repeatedPassword", password, repeatedPassword)) return

        this.setState({errorMessage: ""})
        console.log("all good")
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
            let errorMessage = validate.messages[0]
            this.setState({ errorMessage })
        }

        return check
    }
    
    render = () => (
        <LinearGradient  start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}} colors={[lightGreen, lightBlue]} style={[flex1]}>
            <KeyboardAvoidingView style={[flex1, my2]}>
                <ScrollView>
                    <Popup message={this.state.errorMessage} />
                    <Text style={[h1, my2, textCenter, textDarkGrey]}>{translate('SIGNUP_TITLE')}</Text>
                    <View style={[lightGreyLogoView]}>
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
                        <TouchableOpacity onPress={this.handleSignUpSubmit} disabled={this.checkSignUpEmptyFields()} style={[ buttonGradient, this.checkSignUpEmptyFields() ? opacityLow : opacityHigh]}>
                            <Text style={[textDarkGrey]}>{translate("CREATE_ACCOUNT")}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    )
    
}