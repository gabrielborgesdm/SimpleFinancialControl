import React from 'react'
import { View, Text, Linking } from 'react-native'
import { styles, colors } from "../../../assets/Styles"
import LinearGradient from 'react-native-linear-gradient'

import { getToken, checkIsNotFirstAccess } from "../../helpers/StorageHelpers"
const { lightBlue, lightGreen } = colors
const { flex1 } = styles
export default class Loading extends React.Component {

    componentDidMount() { 
        Linking.getInitialURL().then(url => {
            this.navigate(url)
        })
    }

    handleOpenURL = (event) => {
        this.navigate(event.url)
    }  
    
    navigate = async (url) => {
        const { navigate } = this.props.navigation
        let routeName
        if(url){
            const route = url.replace(/.*?:\/\//g, '')
            const id = route.match(/\/([^\/]+)\/?$/)[1]
            routeName = route.split('/')[0]
        }
    
        if (routeName === 'recoverpassword') {
            navigate('signUp', { id })
        } else {
            if (await getToken()) {
                navigate('transactions')
            } else {
                if(await checkIsNotFirstAccess()){
                    navigate('signIn')
                } else {
                    navigate('welcome')
                }
            }
            
        }
    } 

    render = () =>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 2}} colors={[ lightBlue, lightGreen]} style={[flex1]}>
        </LinearGradient>
}