import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TextInput, RadioButton, Button} from 'react-native-paper';

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

  const newuser = () => {
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
        if (json === 'true') console.log('successfully signed up');
        else alert('error occured while signing up');
      });
  };
  return (
    <ScrollView>
      <View style={{flex: 1}}>
        <View
          style={{
            marginTop: 20,
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
          <Text style={styles.virtualclinic}>Sign Up</Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
          <TextInput
            style={styles.txtinput}
            mode="outlined"
            label="Full Name"
            value={fullname}
            onChangeText={value => setfullname(value)}
          />
          <TextInput
            style={styles.txtinput}
            mode="outlined"
            label="Father Name"
            value={fathername}
            onChangeText={value => setfathername(value)}
          />
          <TextInput
            style={styles.txtinput}
            mode="outlined"
            label="email"
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
          <TextInput
            style={styles.txtinput}
            mode="outlined"
            label="Date Of Birth"
            value={dob}
            onChangeText={value => setdob(value)}
          />
          <TextInput
            style={styles.txtinput}
            mode="outlined"
            label="Contact"
            value={contact}
            onChangeText={value => setcontact(value)}
          />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              flexDirection: 'column',
            }}>
            <Text style={{color: 'black', fontSize: 20}}>Gender</Text>
            <RadioButton.Group
              onValueChange={value => setgender(value)}
              value={gender}>
              <RadioButton.Item label="Male" value="male" />
              <RadioButton.Item label="Female" value="female" />
            </RadioButton.Group>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 30,
              justifyContent: 'center',
            }}>
            <Button
              style={{marginRight: 20}}
              icon="camera"
              mode="outlined"
              onPress={newuser}>
              Signup
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Signup;

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
