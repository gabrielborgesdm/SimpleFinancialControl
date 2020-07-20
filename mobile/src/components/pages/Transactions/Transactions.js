import React, { Component } from "react"
import { View, Text, Image, TouchableOpacity} from "react-native"
import LinearGradient from 'react-native-linear-gradient'

import { getUser, resetUserStorages } from "../../helpers/StorageHelpers"
import { styles, colors } from "../../../assets/Styles"
const { flex1, h1, h3, h4, textCenter, textSm, mt5, mb3, textUnderline, bgYellow, flexGrow1, textBold, fullWidthImage, minimalistInputGroup, buttonMinimalist, textDarkGrey, p2, mx1, my5 } = styles
const { lightBlue, lightGreen } = colors

export default class Transactions extends Component {

    constructor(props){
        super(props)
        this.state = {
            user: null
        }
    }
    getUser = async () => {
        let user = await getUser()
        console.log("user", user)
        if(user) this.setState({user})
    }
    componentDidMount(){
       this.getUser() 
    }
    render = () => (
        <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 2}} colors={[ lightBlue, lightGreen]} style={[flex1]}>
            <Text style={[h1, textDarkGrey, textCenter, textBold, mt5]}>Olá {this.state.user && this.state.user.name}!</Text>
            <Text style={[ textDarkGrey, textCenter, textBold, mt5]}> {this.state.user && this.state.user.email}!</Text>
            <Text style={[ textDarkGrey, textCenter, textBold, mt5]}> {this.state.user && this.state.user.country}!</Text>
            <TouchableOpacity onPress={async ()=>{
                await resetUserStorages()
            }}>
                <Text>Sair</Text>
            </TouchableOpacity>
        </LinearGradient>
    )
    
}