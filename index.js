/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Addpatient from './screens/Addpatient';
import Signup from './screens/Signup';
// global.MyVar = '10.0.2.2';
global.MyVar = '192.168.0.105';

AppRegistry.registerComponent(appName, () => Signup);
