import React, { Component } from "react"
import { View, Text, Image, TouchableOpacity} from "react-native"
import LinearGradient from 'react-native-linear-gradient'

import { setIsNotFirstAccess } from "../../helpers/StorageHelpers"
import { translate, getDisplayLanguage } from "../../helpers/TranslationHelpers"
import { styles, colors } from "../../../assets/Styles"
import welcomeBrazil from "../../../assets/img/welcome-brazil.png"
import welcomeUsa from "../../../assets/img/welcome-usa.png"
const { flex1, h1, h3, h4, textCenter, textSm, mt5, mb3, textUnderline, bgYellow, flexGrow1, textBold, fullWidthImage, minimalistInputGroup, buttonMinimalist, textDarkGrey, p2, mx1, my5 } = styles
const { lightBlue, lightGreen } = colors

export default class Welcome extends Component {
    componentDidMount(){
        setIsNotFirstAccess()
    }
    render = () => (
        <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 2}} colors={[ lightBlue, lightGreen]} style={[flex1]}>
            <Text style={[h1, textDarkGrey, textCenter, textBold, mt5]}>{translate("WELCOME_TO")}</Text>
            <View style={[flexGrow1, mt5]}>
                <Image source={getDisplayLanguage() === "en_US" ? welcomeUsa : welcomeBrazil} resizeMode="contain" style={[fullWidthImage, p2, {alignSelf: "center"}]} />
            </View>
           
            <View style={[minimalistInputGroup]}>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("signUp")} style={[ buttonMinimalist, bgYellow ]}>
                    <Text style={[textDarkGrey, textBold, textSm]}>{translate("CREATE_ACCOUNT")}</Text>
                </TouchableOpacity>
            </View>
            <View style={[minimalistInputGroup], {justifyContent: "center", alignItems: "center", paddingVertical: 20}}>
                <Text style={[textDarkGrey, h4]}>{translate("ALREADY_HAVE_AN_ACCOUNT")}</Text>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("signIn")}>
                    <Text style={[textDarkGrey, h3, mb3, textBold, textUnderline]}>{translate("SIGN_IN")}</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
    
}