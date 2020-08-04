import React, { Component } from "react"
import { View, Text } from "react-native"
import { styles, colors } from "../../assets/Styles"
const { flex1, h1, h3, px2, pr3, flexRow, bgLightBlue, textDarkGrey } = styles
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
const { lightBlue, lightGreen } = colors

export default class PageHeader extends Component {
    constructor(props){
        super(props)
    }

    render = () => 
        <View style={[bgLightBlue, flexRow, px2, { height: 50, alignItems: "center" }]}>
            <Text style={h3}>{this.props.title}</Text>
        </View>
}