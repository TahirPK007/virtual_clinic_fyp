/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Addpatient from './screens/Addpatient';
import Addvitals from './screens/Addvitals';
import Login from './screens/Login';
import Patientdetails from './screens/Patientdetails';
import Signup from './screens/Signup';
import Splash from './screens/Splash';
import Testing from './screens/Testing';
import RefreshControl from './screens/Refreshcontrol';
global.MyVar = '10.0.2.2';
// global.MyVar = '192.168.0.105'; //home ip
// global.MyVar = '192.168.2.192';
// global.MyVar = '192.168.85.120';
// global.MyVar = '192.168.43.122'; //infinix note 3 hotspot's ip
// global.MyVar = '192.168.1.152'; //lab 005 ip

AppRegistry.registerComponent(appName, () => App);
