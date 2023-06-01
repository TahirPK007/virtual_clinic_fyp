import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {RadioButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const Signup = () => {
  const [fullname, setfullname] = useState('');
  const [fathername, setfathername] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [dob, setdob] = useState('');
  const [gender, setgender] = useState('');
  const [contact, setcontact] = useState('');
  const [role, setrole] = useState('jrdoc');
  const [status, setstatus] = useState(0);

  const navigation = useNavigation();

  const newuser = () => {
    if (
      fullname.length < 1 ||
      fathername.length < 1 ||
      email.length < 1 ||
      password.length < 1 ||
      dob.length < 1 ||
      gender.length < 1 ||
      contact.length < 1
    ) {
      alert('Enter all the fields');
    } else {
      fetch(`http://${global.MyVar}/fyp/api/Jrdoc/Jrsignup`, {
        method: 'POST',
        body: JSON.stringify({
          full_name: `${fullname}`,
          father_name: `${fathername}`,
          email: `${email}`,
          password: `${password}`,
          dob: `${dob}`,
          contact: `${contact}`,
          gender: `${gender}`,
          role: `${role}`,
          status: `${status}`,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then(response => response.json())
        .then(json => {
          if (json === 'true') {
            alert('Successfully Signed Up');
            navigation.navigate('Login');
          } else alert('Error Occured While Signing Up');
        });
    }
  };
  return (
    <ScrollView>
      <View style={{flex: 1}}>
        <Text
          style={{
            color: 'green',
            fontSize: 40,
            fontWeight: '800',
            marginTop: 10,
            alignSelf: 'center',
          }}>
          Junior Doctor Signup
        </Text>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderTopWidth: 1,
            width: '95%',
            alignSelf: 'center',
          }}>
          <TextInput
            style={{
              width: '90%',
              borderWidth: 1,
              borderRadius: 15,
              paddingLeft: 15,
              marginTop: 10,
            }}
            placeholder="Enter Full Name"
            placeholderTextColor={'black'}
            value={fullname}
            onChangeText={value => setfullname(value)}
          />
          <TextInput
            style={{
              width: '90%',
              borderWidth: 1,
              borderRadius: 15,
              paddingLeft: 15,
              marginTop: 10,
            }}
            placeholder="Enter Father Name"
            placeholderTextColor={'black'}
            value={fathername}
            onChangeText={value => setfathername(value)}
          />
          <TextInput
            style={{
              width: '90%',
              borderWidth: 1,
              borderRadius: 15,
              paddingLeft: 15,
              marginTop: 10,
            }}
            placeholder="Enter Email Address"
            placeholderTextColor={'black'}
            value={email}
            onChangeText={value => setemail(value)}
            keyboardType="email-address"
          />
          <TextInput
            style={{
              width: '90%',
              borderWidth: 1,
              borderRadius: 15,
              paddingLeft: 15,
              marginTop: 10,
            }}
            placeholder="Enter Password"
            placeholderTextColor={'black'}
            value={password}
            onChangeText={value => setpassword(value)}
            secureTextEntry={true}
          />
          <TextInput
            style={{
              width: '90%',
              borderWidth: 1,
              borderRadius: 15,
              paddingLeft: 15,
              marginTop: 10,
            }}
            placeholder="DD-MM-YYYY"
            placeholderTextColor={'black'}
            value={dob}
            onChangeText={value => setdob(value)}
          />
          <TextInput
            style={{
              width: '90%',
              borderWidth: 1,
              borderRadius: 15,
              paddingLeft: 15,
              marginTop: 10,
            }}
            placeholder="Enter Contact Number"
            placeholderTextColor={'black'}
            value={contact}
            onChangeText={value => setcontact(value)}
            keyboardType="number-pad"
          />
        </View>
        <View
          style={{
            borderWidth: 1,
            width: '85%',
            alignSelf: 'center',
            marginTop: 10,
            borderRadius: 15,
          }}>
          <Text
            style={{
              fontSize: 20,
              color: 'black',
              fontWeight: 'bold',
              marginLeft: 10,
              marginTop: 10,
            }}>
            Select Your Gender
          </Text>
          <RadioButton.Group
            onValueChange={value => setgender(value)}
            value={gender}>
            <RadioButton.Item label="Male" value="Male" />
            <RadioButton.Item label="Female" value="Female" />
          </RadioButton.Group>
        </View>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            width: '70%',
            height: 40,
            alignSelf: 'center',
            marginTop: 20,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            newuser();
          }}>
          <Text style={{color: 'black', fontWeight: '600'}}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  virtualclinic: {
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginTop: 5,
    marginBottom: 15,
    color: 'black',
    marginLeft: 15,
  },
  txtinput: {
    width: '80%',
    marginBottom: 5,
  },
});
