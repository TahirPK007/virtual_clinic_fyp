import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Fontisto';
import Icon2 from 'react-native-vector-icons/Octicons';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Addpatient from './Addpatient';
import Ongoingcases from './Ongoingcases';
import Reports from './Reports';

const Tab = createBottomTabNavigator();

const Bottomnavigator = ({route, navigation}) => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="New Patient"
        component={Addpatient}
        options={{
          tabBarIcon: ({}) => (
            <Icon name="bed-patient" size={30} color="black" />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Ongoing Cases"
        component={Ongoingcases}
        options={{
          tabBarIcon: ({}) => <Icon3 name="walking" size={30} color="black" />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Reports"
        component={Reports}
        options={{
          tabBarIcon: ({}) => <Icon2 name="report" size={30} color="black" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default Bottomnavigator;
