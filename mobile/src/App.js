import 'react-native-gesture-handler'
import React, { Component  } from "react"
import { Linking } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircle, faHome, faHistory, faBars } from '@fortawesome/free-solid-svg-icons';

import Loading from './components/pages/Authentication/Loading'
import Welcome from './components/pages/Authentication/Welcome'

import SignUp from './components/pages/Authentication/SignUp'
import SignIn from './components/pages/Authentication/SignIn'
import ConfirmAccount from './components/pages/Authentication/ConfirmAccount'
import PasswordRecovery from './components/pages/Authentication/PasswordRecovery'
import PasswordRecoveryEmail from './components/pages/Authentication/PasswordRecoveryEmail'

import Transactions from './components/pages/Transactions/Transactions'
import History from './components/pages/History/History'

import Menu from './components/pages/Menu/Menu'


export default class App extends Component {

    HomeStackScreen() {
        const HomeStack = createBottomTabNavigator()
        return (
            <HomeStack.Navigator tabBarOptions={{ activeTintColor: 'tomato', inactiveTintColor: 'gray', showLabel: false}}>
                <HomeStack.Screen name="transactions" options={{ tabBarIcon: ({ focused, color, size }) => <FontAwesomeIcon icon={faHome} color={color} />  }} component={Transactions} /> 
                <HomeStack.Screen name="history" options={{ tabBarIcon: ({ focused, color, size }) => <FontAwesomeIcon icon={faHistory} color={color} />  }} component={History} /> 
                <HomeStack.Screen name="menu" options={{ tabBarIcon: ({ focused, color, size }) => <FontAwesomeIcon icon={faBars} color={color} />  }} component={Menu} /> 
            </HomeStack.Navigator>
        )
    }

    render = () => {
        const Stack = createStackNavigator()

        return (
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen name="loading" options={{ headerShown: false }} component={Loading} />
                <Stack.Screen name="welcome" options={{ headerShown: false }} component={Welcome} />
                <Stack.Screen name="signUp" options={{ headerShown: false }} component={SignUp} /> 
                <Stack.Screen name="signIn" options={{ headerShown: false }} component={SignIn} /> 
                <Stack.Screen name="confirmAccount" options={{ headerShown: false }} component={ConfirmAccount} /> 
                <Stack.Screen name="passwordRecovery" options={{ headerShown: false }} component={PasswordRecovery} /> 
                <Stack.Screen name="passwordRecoveryEmail" options={{ headerShown: false }} component={PasswordRecoveryEmail} /> 
                <Stack.Screen name="Home" name="home" options={{ headerShown: false }} component={this.HomeStackScreen} /> 
            </Stack.Navigator>
        </NavigationContainer>
        )
    }
} 