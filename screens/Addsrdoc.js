import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

const Addsrdoc = ({navigation}) => {
  const [fullname, setfullname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const addingsrdoc = () => {
    fetch(`http://${global.MyVar}/fyp/api/Admin/Addnewsrdoc`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        full_name: fullname,
        email: email,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          width: '100%',
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
          height: 50,
        }}>
        <Text style={{color: 'black', fontSize: 20, fontWeight: '700'}}>
          Add New Senior Doctor
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '80%',
        }}>
        <TextInput
          style={{
            width: '90%',
            borderWidth: 1,
            borderRadius: 10,
            alignSelf: 'center',
            marginTop: 50,
            paddingLeft: 10,
          }}
          placeholder="Enter Name"
          placeholderTextColor={'black'}
          value={fullname}
          onChangeText={txt => setfullname(txt)}
        />
        <TextInput
          style={{
            width: '90%',
            borderWidth: 1,
            borderRadius: 10,
            alignSelf: 'center',
            marginTop: 10,
            paddingLeft: 10,
          }}
          placeholder="Enter Email"
          placeholderTextColor={'black'}
          value={email}
          onChangeText={txt => setemail(txt)}
        />
        <TextInput
          style={{
            width: '90%',
            borderWidth: 1,
            borderRadius: 10,
            alignSelf: 'center',
            marginTop: 10,
            paddingLeft: 10,
          }}
          placeholder="Enter Password"
          placeholderTextColor={'black'}
          value={password}
          onChangeText={txt => setpassword(txt)}
        />
        <TouchableOpacity
          style={{
            width: '90%',
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 10,
            backgroundColor: 'green',
          }}
          onPress={() => {
            addingsrdoc();
          }}>
          <Text style={{color: 'white', fontSize: 20, fontWeight: '600'}}>
            Add
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '90%',
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 10,
            backgroundColor: 'green',
          }}
          onPress={() => {
            navigation.navigate('Adminpanel');
          }}>
          <Text style={{color: 'white', fontSize: 20, fontWeight: '600'}}>
            Go Home
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Addsrdoc;
