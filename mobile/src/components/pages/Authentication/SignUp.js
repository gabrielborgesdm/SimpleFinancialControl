import React, { Component } from "react"
import { SafeAreaView, View, Text, TextInput, Image, TouchableOpacity } from "react-native"
import { styles, spacing, colors, dimensions } from "../../../assets/Styles"

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser, faPlus, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import LinearGradient from 'react-native-linear-gradient'

import ShortLogo from "../../../assets/img/short-logo2.png"

const {pAbsolute, h1, h2, minimalistInputControl, minimalistInputIcon, lightGreyLogoView, lightGreyLogoImage, minimalistInputGroup, borderRounded, textCenter, textDarkGrey, buttonGradient, mtXl, mtMd, mySm, mxLg, b0, r0, flex1, signUpContainer} = styles
const {sLg, sMd} = spacing
const { quarterWidth } = dimensions
const {lightBlue, lightGreen, lightGrey} = colors

export default class SignUp extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: "",
            name: "",
            password: "",
            repeatedPassword: "",
            country: ""
        }
    }

    render = () => (
        <SafeAreaView style={[flex1, signUpContainer]}>
            <LinearGradient  start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}} colors={[lightGreen, lightBlue]} style={[flex1]}>
            <Text style={[h1, mtMd, textCenter, textDarkGrey]}>REGISTRATION SCREEN</Text>
            <View style={lightGreyLogoView}>
                <Image source={ShortLogo} style={lightGreyLogoImage} />
            </View>
            <View style={[flex1, mtXl]}>
                <View style={minimalistInputGroup}>
                    <FontAwesomeIcon style={minimalistInputIcon} icon={faUser} />
                    <TextInput 
                        placeholder="Full Name"
                        autoCompleteType="name"
                        autoCorrect={true}
                        defaultValue={this.state.name}
                        style={minimalistInputControl}
                        onChangeText={text=>console.log(text)}
                        ></TextInput>
                </View>
                <View style={minimalistInputGroup}>
                    <FontAwesomeIcon style={minimalistInputIcon} icon={faEnvelope} />
                    <TextInput 
                        placeholder="Account e-mail"
                        autoCapitalize="none"
                        autoCompleteType="email"
                        autoCorrect={false}
                        defaultValue={this.state.email}
                        style={minimalistInputControl}
                        ></TextInput>
                </View>
                <View style={minimalistInputGroup}>
                    <FontAwesomeIcon style={minimalistInputIcon} icon={faLock} />
                    <TextInput 
                        placeholder="Account Password"
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoCompleteType="password"
                        autoCorrect={false}
                        defaultValue={this.state.password}
                        style={minimalistInputControl}
                        ></TextInput>
                </View>
                <View style={minimalistInputGroup}>
                    <FontAwesomeIcon style={minimalistInputIcon} icon={faLock} />
                    <TextInput 
                        placeholder="Repeat Account Password"
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoCompleteType="password"
                        autoCorrect={false}
                        defaultValue={this.state.repeatedPassword}
                        style={minimalistInputControl}
                        ></TextInput>
                </View>
            </View>
            <View style={minimalistInputGroup}>
                <TouchableOpacity style={buttonGradient}>
                    <Text style={[textDarkGrey]}>Create Account</Text>
                </TouchableOpacity>
            </View>
            </LinearGradient>
        </SafeAreaView>
    )
    
}

