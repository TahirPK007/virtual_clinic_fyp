import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

const Login = ({navigation}) => {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();

  useEffect(() => {
    getUser();
  }, []);

  const loginandstoring = () => {
    saveuser();
    signin();
  };

  const saveuser = async () => {
    try {
      await AsyncStorage.setItem('emaill', email);
      await AsyncStorage.setItem('passwordd', password);
    } catch (e) {
      console.log(e);
    }
  };

  const getUser = async () => {
    try {
      setemail(await AsyncStorage.getItem('emaill'));
      setpassword(await AsyncStorage.getItem('passwordd'));
    } catch (e) {
      console.log(e);
    }
  };

  const signin = async () => {
    await fetch(
      `http://${global.MyVar}/fyp/api/Nursel/Nurselogin?email=${email}&password=${password}`,
      {
        method: 'POST',
        body: JSON.stringify({
          email: `${email}`,
          password: `${password}`,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    )
      .then(response => response.json())
      .then(json => {
        if (json.role === 'nurse') navigation.navigate('Bottomnavigator');
        else {
          fetch(
            `http://${global.MyVar}/fyp/api/Jrdoc/Jrlogin?email=${email}&password=${password}`,
            {
              method: 'POST',
              body: JSON.stringify({
                email: `${email}`,
                password: `${password}`,
              }),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            },
          )
            .then(response => response.json())
            .then(json => {
              if (json.role === 'jrdoc') {
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
            marginTop: 60,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{
              height: 100,
              width: 100,
              resizeMode: 'center',
              borderWidth: 2,
              borderColor: 'green',
              borderRadius: 100,
            }}
            source={require('../images/icon.png')}
          />
          <Text style={styles.virtualclinic}>Virtual Clinic</Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            marginTop: 0,
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
            marginTop: 10,
          }}>
          <View style={{marginRight: 20}}>
            <Icon.Button
              style={{
                width: 120,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              name="login"
              backgroundColor="green"
              onPress={loginandstoring}>
              Login
            </Icon.Button>
          </View>
          <View style={{marginLeft: 20}}>
            <Icon2.Button
              style={{
                width: 120,
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
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 5,
    marginTop: 10,
    marginBottom: 20,
  },
  txtinput: {
    width: '90%',
    marginBottom: 25,
  },
});
