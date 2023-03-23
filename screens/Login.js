import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {TextInput, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

const Login = ({navigation}) => {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  console.log(email, 'email');
  console.log(password, 'password');

  useEffect(() => {
    getUser();
  }, []);


  //created this funciton to call other 2 functions
  const loginandstoring = () => {
    saveuser();
    signin();
  };

  //its saving email pass to localstorage
  const saveuser = async () => {
    try {
      await AsyncStorage.setItem('emaill', email);
      await AsyncStorage.setItem('passwordd', password);
    } catch (e) {
      console.log(e);
    }
  };

  //fetching email pass from local storage
  const getUser = async () => {
    try {
      setemail(await AsyncStorage.getItem('emaill'));
      setpassword(await AsyncStorage.getItem('passwordd'));
    } catch (e) {
      console.log(e);
    }
  };

  //login function for nurse and jr doc
  const signin = async () => {
    await fetch(
      `http://${global.MyVar}/fyp/api/Nursel/Nurselogin?email=${email}&password=${password}`,
      {
        method: 'POST',
        // body: JSON.stringify({
        //   email: `${email}`,
        //   password: `${password}`,
        // }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    )
      .then(response => response.json())
      .then(json => {
        if (json.role == 'nurse') navigation.navigate('Bottomnavigator');
        else {
          fetch(
            `http://${global.MyVar}/fyp/api/Jrdoc/Jrlogin?email=${email}&password=${password}`,
            {
              method: 'POST',
              // body: JSON.stringify({
              //   email: `${email}`,
              //   password: `${password}`,
              // }),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            },
          )
            .then(response => response.json())
            .then(json => {
              if (json.role == 'jrdoc') {
                navigation.navigate('Jrdoc', {paramkey: json});
              } else alert('wrong email or password');
            });
        }
      });
  };

  return (
    <ScrollView>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            marginTop: responsiveHeight(8),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{
              height: responsiveWidth(35),
              width: responsiveWidth(35),
              resizeMode: 'contain',
              borderWidth: responsiveWidth(0.6),
              borderColor: 'green',
              borderRadius: responsiveWidth(100),
            }}
            source={require('../images/icon.png')}
          />
          <Text style={styles.virtualclinic}>Virtual Clinic</Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: responsiveWidth(100),
          }}>
          <TextInput
            style={styles.txtinput}
            mode="outlined"
            label="Email"
            value={email}
            onChangeText={value => setemail(value)}
          />

          <TextInput
            style={styles.txtinput}
            mode="outlined"
            label="Password"
            value={password}
            onChangeText={value => setpassword(value)}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            wdith: '90%',
            marginTop: responsiveHeight(3),
          }}>
          <View style={{marginRight: responsiveWidth(4)}}>
            <Icon.Button
              style={{
                width: responsiveWidth(35),
                justifyContent: 'center',
                alignItems: 'center',
              }}
              name="login"
              backgroundColor="green"
              onPress={loginandstoring}>
              Login
            </Icon.Button>
          </View>
          <View style={{marginLeft: responsiveWidth(5)}}>
            <Icon2.Button
              style={{
                width: responsiveWidth(35),
                justifyContent: 'center',
                alignItems: 'center',
              }}
              name="account-arrow-left-outline"
              backgroundColor="green"
              onPress={() => {
                navigation.navigate('Signup');
              }}>
              Signup
            </Icon2.Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  virtualclinic: {
    fontSize: responsiveFontSize(5),
    fontWeight: 'bold',
    letterSpacing: 5,
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(5),
  },
  txtinput: {
    width: responsiveWidth(90),
    marginBottom: responsiveHeight(5),
  },
});
