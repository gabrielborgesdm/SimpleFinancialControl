import React from 'react'
import { View, Text, Linking } from 'react-native'

export default class Home extends React.Component {

    componentDidMount() { 
        Linking.getInitialURL().then(url => {
            this.navigate(url)
        })
    }

    handleOpenURL = (event) => {
        this.navigate(event.url)
    }  
    
    navigate = (url) => {
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
            navigate('welcome')
        }
    } 

    render = () =>
        <View>
            <Text>Carregando...</Text>
        </View>
}