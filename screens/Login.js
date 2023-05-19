import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
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
import {useDispatch} from 'react-redux';
import {getNurseData} from './redux toolkit/nurseSlice';

const Login = ({navigation}) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = today.getDate();

  // Format the date as desired (e.g., M/D/YYYY)
  let formattedDay = day.toString();
  if (formattedDay.length === 2 && formattedDay.startsWith('0')) {
    formattedDay = formattedDay.slice(1);
  }

  const formattedDate = `${month.toString()}/${formattedDay}/${year}`;
  console.log(formattedDate, 'this is date');

  const dispatch = useDispatch();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [user, setuser] = useState('admin');
  const [pass, setpass] = useState('admin');
  const [visible, setvisible] = useState(false);
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
        if (json.role == 'nurse') {
          dispatch(getNurseData(json));
          navigation.navigate('Bottomnavigator');
        } else {
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
              } else {
                fetch(
                  `http://${global.MyVar}/fyp/api/Srdoc/Srdoclogin?email=${email}&password=${password}`,
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
                    if (json.role == 'srdoc') {
                      navigation.navigate('Srdoc', {paramkey: json});
                    } else alert('wrong email or password');
                  });
              }
            });
        }
      });
  };

  const checkadmin = () => {
    if (user == 'admin' && pass == 'admin') {
      navigation.navigate('Adminpanel');
      setvisible(false);
    } else {
      alert('Wrong Credentials');
    }
  };

  return (
    <ScrollView>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Modal visible={visible} transparent>
          <View style={{flex: 1, backgroundColor: 'rgba(255,255,255,0.5)'}}>
            <View
              style={{
                height: 300,
                width: '90%',
                backgroundColor: 'black',
                // justifyContent: 'center',
                // alignItems: 'center',
                marginTop: 300,
                alignSelf: 'center',
                borderRadius: 15,
              }}>
              <TextInput
                style={{width: '85%', alignSelf: 'center', marginTop: 30}}
                mode="flat"
                label="Enter Your Username"
                value={user}
                onChangeText={value => setuser(value)}
              />
              <TextInput
                style={{width: '85%', alignSelf: 'center', marginTop: 15}}
                mode="flat"
                label="Enter Your Password"
                value={pass}
                onChangeText={value => setpass(value)}
                secureTextEntry={true}
              />
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: 'white',
                    marginTop: 10,
                    width: '80%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 15,
                    height: 40,
                  }}
                  onPress={() => {
                    checkadmin();
                  }}>
                  <Text style={{color: 'white'}}>OK</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: 'white',
                    marginTop: 10,
                    width: '80%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 15,
                    height: 40,
                  }}
                  onPress={() => {
                    setvisible(false);
                  }}>
                  <Text style={{color: 'white'}}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
            marginTop: 0,
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
        <View
          style={{
            width: '90%',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'green',
              width: '88%',
              height: 35,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              marginTop: 5,
              alignSelf: 'center',
            }}
            onPress={() => {
              navigation.navigate('Patientend');
            }}>
            <Text style={{color: 'white', fontSize: 17, fontWeight: '600'}}>
              Patient
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: 'green',
              width: '88%',
              height: 35,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              marginTop: 5,
              alignSelf: 'center',
            }}
            onPress={() => {
              setvisible(true);
            }}>
            <Text style={{color: 'white', fontSize: 17, fontWeight: '600'}}>
              Admin
            </Text>
          </TouchableOpacity>
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
