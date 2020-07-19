/**
 * @format
 */

import {AppRegistry} from 'react-native'
import App from './src/App'
import {name as appName} from './app.json'

import {typography} from "./src/components/utils/Typography"

typography() 

AppRegistry.registerComponent(appName, () => App);
