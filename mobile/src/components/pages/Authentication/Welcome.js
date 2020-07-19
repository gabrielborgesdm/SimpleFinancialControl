import React, { Component } from "react"
import { View, Text, KeyboardAvoidingView, TextInput, Image, TouchableOpacity, ScrollView, Button} from "react-native"
import LinearGradient from 'react-native-linear-gradient'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser, faEnvelope, faLock, faCheckCircle, faCircle } from '@fortawesome/free-solid-svg-icons'

import { translate, getDisplayLanguage } from "../../helpers/TranslationHelpers"
import { styles, colors } from "../../../assets/Styles"
import ShortLogo from "../../../assets/img/short-logo2.png"

import welcomeBrazil from "../../../assets/img/welcome-brazil.png"
import welcomeUsa from "../../../assets/img/welcome-usa.png"

const { flex1, h1, h3, h4, textCenter, textSm, mt5, mb3, textUnderline, bgYellow, flexGrow1, textBold, fullWidthImage, minimalistInputGroup, buttonMinimalist, textDarkGrey, p2, mx1, my5 } = styles
const { lightBlue, lightGreen } = colors

export default class Welcome extends Component {
    navigateToSignUp = () => {
        this.props.navigation.navigate("signUp")
    }

    render = () => (
        <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 2}} colors={[ lightBlue, lightGreen]} style={[flex1]}>
            <Text style={[h1, textDarkGrey, textCenter, textBold, mt5]}>Bem vindo(a) ao</Text>
            <View style={[flexGrow1, mt5]}>
                <Image source={getDisplayLanguage() === "en_US" ? welcomeUsa : welcomeBrazil} resizeMode="contain" style={[fullWidthImage, p2, {alignSelf: "center"}]} />
            </View>
           
            <View style={[minimalistInputGroup]}>
                <TouchableOpacity onPress={this.navigateToSignUp} style={[ buttonMinimalist, bgYellow ]}>
                    <Text style={[textDarkGrey, textBold, textSm]}>{translate("CREATE_ACCOUNT")}</Text>
                </TouchableOpacity>
            </View>
            <View style={[minimalistInputGroup], {justifyContent: "center", alignItems: "center", paddingVertical: 20}}>
                <Text style={[textDarkGrey, h4]}>Já é um membro?</Text>
                <TouchableOpacity>
                    <Text style={[textDarkGrey, h3, mb3, textBold, textUnderline]}>Faça Login</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
    
}