import React, { Component } from "react"
import { View, Text, Image, TouchableOpacity} from "react-native"
import LinearGradient from 'react-native-linear-gradient'

import { getUser, resetUserStorages } from "../../helpers/StorageHelpers"
import { styles, colors } from "../../../assets/Styles"
const { flex1, h1, h3, h4, textCenter, textSm, mt5, mb3, textUnderline, py5, bgYellow, flexGrow1, textBold, fullWidthImage, minimalistInputGroup, buttonMinimalist, textDarkGrey, p2, mx1, my5 } = styles
const { lightBlue, lightGreen } = colors

export default class Transactions extends Component {

    constructor(props){
        super(props)
        this.state = {
            user: null
        }
    }
    getUser = async () => {
        /* let user = await getUser()
        console.log("user", user)
        if(user) this.setState({user}) */
    }
    componentDidMount(){
       this.getUser() 
    }
    render = () => (
        <View style={[flex1, ]}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 2}} style={[py5]} colors={[ lightBlue, lightGreen]}>
                <Text style={[h1, textDarkGrey, textCenter, textBold]}>Olá {this.state.user && this.state.user.name}!</Text>
            </LinearGradient>
        </View>
    )
    
}