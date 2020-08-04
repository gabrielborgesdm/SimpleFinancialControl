import React, { Component } from "react"
import { Alert, Text, Image, TouchableOpacity, SafeAreaView} from "react-native"
import { ScrollView } from "react-native-gesture-handler"

import PageHeader from "../../templates/PageHeader"
import { getUser, resetUserStorages } from "../../helpers/StorageHelpers"
import { styles, colors } from "../../../assets/Styles"
import { translate } from "../../helpers/TranslationHelpers"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
const { flex1, px4, bgWhite, flexGrow1, textMd, flexRow, lightGrey, textRed, textDarkGrey, touchableMenuOption } = styles
const { lightBlue, lightGreen } = colors

export default class Menu extends Component {

    constructor(props){
        super(props)
        this.state = {
            user: null
        }
    }
    
    logoff = () => {

        Alert.alert(
            translate("LOGOFF"),
            translate("ARE_YOU_SURE_YOU_WANT_TO_LEAVE"),
            [
              {text: 'Yes', onPress: () => { 
                    resetUserStorages()
                    this.props.navigation.navigate("signIn")
                }},
              {text: 'No'},
            ]
        );
        
    }

    render = () => (
        <SafeAreaView style={flex1}>
            <PageHeader title={translate("SETTINGS")} />
            <ScrollView style={[flexGrow1, lightGrey]}>
                <TouchableOpacity style={[touchableMenuOption, bgWhite, flexRow, {alignItems: "center"}]} onPress={()=>this.logoff()}>
                    <FontAwesomeIcon icon={faSignOutAlt} size={25} style={[textRed, px4]} />
                    <Text style={[textDarkGrey, textMd]}>{translate("LOGOFF")}</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
    
}