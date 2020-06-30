import React, { Component } from "react"
import { SafeAreaView, View, Text } from "react-native"
import { styles, spacing, colors } from "../../../assets/Styles"

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser, faPlus } from '@fortawesome/free-solid-svg-icons'
import LinearGradient from 'react-native-linear-gradient'

const {pAbsolute, h2, borderRounded, textCenter, b0, r0, textBlack, signUpContainer} = styles
const {sLg, sMd} = spacing
const {lightBlue, lightGreen} = colors

export default class SignUp extends Component {

    render = () => (
        <SafeAreaView style={signUpContainer}>
            <Text style={[h2, textBlack, textCenter]}>REGISTRATION SCREEN</Text>
            <LinearGradient
                start={{x: 0, y: 0.5}} 
                end={{x: 1, y: 0.5}}
                colors={[lightBlue, lightGreen]}
                style={[borderRounded, {marginVertical: sMd, padding: sLg}]}
                >
                    <View style={[borderRounded, { backgroundColor: "#fff", padding: sLg}]}>
                        <FontAwesomeIcon icon={ faUser } size={60} />
                        <FontAwesomeIcon style={[pAbsolute,  b0, r0]} icon={ faPlus } size={20} />
                    </View>
            </LinearGradient>
        </SafeAreaView>
    )
    
}

