import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TextInput, RadioButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

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
        if (json === 'true') alert('Successfully Signed Up');
        else alert('Error Occured While Signing Up');
      });
  };
  return (
    <ScrollView>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View
          style={
            {
              // marginTop: 20,
              // justifyContent: 'center',
              // alignItems: 'center',
            }
          }>
          {/* <Image
            style={{
              height: 100,
              width: 100,
              resizeMode: 'center',
              borderWidth: 2,
              borderColor: 'green',
              borderRadius: 100,
            }}
            source={require('../images/icon.png')}
          /> */}
          <Text style={styles.virtualclinic}>Sign Up</Text>
        </View>
        <View
          style={{
            // justifyContent: 'center',
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
              // justifyContent: 'center',
              // alignItems: 'center',
              width: '100%',
              flexDirection: 'column',
            }}>
            <RadioButton.Group
              onValueChange={value => setgender(value)}
              value={gender}>
              <Text style={{fontSize: 20, marginLeft: 40, color: 'black'}}>
                Gender :
              </Text>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <RadioButton.Item
                  label="Male"
                  value="male"
                  style={{width: 120}}
                />
                <RadioButton.Item
                  label="Female"
                  value="female"
                  style={{width: 120}}
                />
              </View>
            </RadioButton.Group>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'center',
          }}>
          <Icon.Button
            style={{
              width: 200,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            name="person-add-sharp"
            backgroundColor="green"
            onPress={newuser}>
            Continue
          </Icon.Button>
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
