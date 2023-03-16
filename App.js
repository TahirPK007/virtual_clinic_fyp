import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Bottomnavigator from './screens/Bottomnavigator';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Addpatient from './screens/Addpatient';
import Addvitals from './screens/Addvitals';
import Jrdoc from './screens/Jrdoc';
import Splash from './screens/Splash';
import Patientdetails from './screens/Patientdetails';

const Stack = createNativeStackNavigator();

const App = () => {
  const [loading, setloading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 100);
  }, []);

  return (
    <>
      {loading !== false ? (
        <Splash />
      ) : (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Bottomnavigator"
              component={Bottomnavigator}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Addpatient"
              component={Addpatient}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Addvitals"
              component={Addvitals}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Jrdoc"
              component={Jrdoc}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Patientdetails"
              component={Patientdetails}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
};

export default App;
