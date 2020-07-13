import React, { Component } from "react"
import { View, Text, KeyboardAvoidingView, TextInput, Image, TouchableOpacity, ScrollView} from "react-native"
import LinearGradient from 'react-native-linear-gradient'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser, faEnvelope, faLock, faCheckCircle, faCircle } from '@fortawesome/free-solid-svg-icons'

import { translate, getDisplayLanguage } from "../../helpers/TranslationHelpers"
import { styles, colors } from "../../../assets/Styles"
import ShortLogo from "../../../assets/img/short-logo2.png"
import simpleFinancialControlTextBrazil from "../../../assets/img/simple-financial-control-text-brazil.png"
import simpleFinancialControlTextUsa from "../../../assets/img/simple-financial-control-text-usa.png"

const { flex1, h1, textWhite, textCenter, lightGreyLogoImage, minimalistInputGroup, buttonMinimalist, textDarkGrey, mx1, my5 } = styles
const { lightBlue, lightGreen } = colors


export default class Welcome extends Component {
  
    render = () => (
        <LinearGradient colors={[lightBlue, lightGreen]} style={[flex1]}>
            <Text style={[h1, textWhite, textCenter, my5]}>Seja Bem vindo(a) ao</Text>
            <Image source={ShortLogo} style={[lightGreyLogoImage]} />
            <Image source={getDisplayLanguage() === "en_US" ? simpleFinancialControlTextUsa : simpleFinancialControlTextBrazil} style={{alignSelf: "center"}} />
           
            <View style={[minimalistInputGroup, my5,]}>
                <TouchableOpacity style={[ buttonMinimalist, mx1 ]}>
                    <Text style={[textDarkGrey]}>{translate("CREATE_ACCOUNT")}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[ buttonMinimalist ]}>
                    <Text style={[textDarkGrey]}>Fazer Login</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
    
}