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
      <View style={{flex: 1,justifyContent:"center",alignItems:"center"}}>
        <View
          style={{
            marginTop: 100,
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
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              justifyContent: 'center',
            }}>
            <Button
              style={{marginRight: 20}}
              icon="camera"
              mode="outlined"
              onPress={loginandstoring}>
              Log In
            </Button>
            <Button
              icon="camera"
              mode="outlined"
              onPress={() => {
                navigation.navigate('Signup');
              }}>
              Sign Up
            </Button>
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
  pass: {
    marginTop: 10,
  },
  txtinput: {
    width: '70%',
    marginBottom: 15,
  },
});
