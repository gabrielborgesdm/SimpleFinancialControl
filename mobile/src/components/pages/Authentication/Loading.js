import React from 'react'
import { Linking } from 'react-native'
import { styles, colors } from "../../../assets/Styles"
import LinearGradient from 'react-native-linear-gradient'

import { getToken, checkIsNotFirstAccess } from "../../helpers/StorageHelpers"
const { lightBlue, lightGreen } = colors
const { flex1 } = styles
export default class Loading extends React.Component {

    async componentDidMount() {
        const url = await Linking.getInitialURL()
        this.navigate(url)
        Linking.addEventListener('url', this.handleOpenURL)
    }

    handleOpenURL = (event) => {
        this.navigate(event.url)
    }

    navigate = (url = null) => {
        
        const { navigate } = this.props.navigation
        if(url){
            let route = url.replace(/.*?:\/\//g, '')
            let page = route.split("/")[1]
            if(page === "confirmaccount"){
                let token = route.split("/")[2]
                navigate("confirmAccount", {token})

            } else if(page === "recoverpassword"){
                let token = route.split("/")[2]
                navigate("passwordRecovery", {token})

            } else {
                this.navigateWithoutLink() 
            }
        } else {
            this.navigateWithoutLink()
        }   
    }

    navigateWithoutLink = async () => {
        const { navigate } = this.props.navigation
        if (await getToken()) {
            navigate('home')
        } else {
            if(await checkIsNotFirstAccess()){
                navigate('signIn')
            } else {
                navigate('welcome')
            }
        }
    }

    render = () =>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 2}} colors={[ lightBlue, lightGreen]} style={[flex1]}>
        </LinearGradient>
}