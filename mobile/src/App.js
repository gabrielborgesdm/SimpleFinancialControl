import 'react-native-gesture-handler'
import React, { Component  } from "react"
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Loading from './components/pages/Authentication/Loading'
import Welcome from './components/pages/Authentication/Welcome'
import SignUp from './components/pages/Authentication/SignUp'
import SignIn from './components/pages/Authentication/SignIn'
import Transactions from './components/pages/Transactions/Transactions'


export default class App extends Component {

    render = () => {
        const Stack = createStackNavigator()
        
        return (
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen name="loading" options={{ headerShown: false, title: "Loading" }} component={Loading} />
                <Stack.Screen name="welcome" options={{ headerShown: false, title: "Welcome" }} component={Welcome} />
                <Stack.Screen name="signUp" options={{ headerShown: false, title: "Sign Up" }} component={SignUp} /> 
                <Stack.Screen name="signIn" options={{ headerShown: false, title: "Sign In" }} component={SignIn} /> 
                <Stack.Screen name="transactions" options={{ headerShown: false, title: "Transactions" }} component={Transactions} /> 
            </Stack.Navigator>
        </NavigationContainer>
        )
    }
} 