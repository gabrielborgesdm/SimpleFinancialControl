import 'react-native-gesture-handler'
import React, { Component } from "react"
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Welcome from './components/pages/Authentication/Welcome'
import SignUp from './components/pages/Authentication/SignUp'

export default class App extends Component {

    render = () => {
        const Stack = createStackNavigator()
        
        return (
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen name="welcome" options={{ headerShown: false, title: "Welcome" }} component={Welcome} />
                <Stack.Screen name="signUp" options={{ headerShown: false, title: "Sign Up" }} component={SignUp} />
            </Stack.Navigator>
        </NavigationContainer>
        )
    }
} 