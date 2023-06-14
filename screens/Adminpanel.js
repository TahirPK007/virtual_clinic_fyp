import {View, Text, TouchableOpacity, TextInput, Alert} from 'react-native';
import React, {useState} from 'react';

const Adminpanel = ({navigation}) => {
  const [threshold, setthreshold] = useState();

  //setting threshold for global doctors
  const settingthreshold = async () => {
    await fetch(
      `http://${global.MyVar}/fyp/api/Jobs/SettingThreshold?thresh=${threshold}`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    )
      .then(response => response.json())
      .then(json => {
        Alert.alert(json);
      });
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          height: 50,
        }}>
        <Text style={{color: 'black', fontSize: 20, fontWeight: '700'}}>
          Admin Panel
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '90%',
        }}>
        <TouchableOpacity
          style={{
            width: '90%',
            borderWidth: 1,
            borderRadius: 15,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}
          onPress={() => {
            navigation.navigate('Addnurse');
          }}>
          <Text style={{color: 'black', fontSize: 18}}>Add Nurse</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '90%',
            borderWidth: 1,
            borderRadius: 15,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: 10,
          }}
          onPress={() => {
            navigation.navigate('Addsrdoc');
          }}>
          <Text style={{color: 'black', fontSize: 18}}>Add Senior Doctor</Text>
        </TouchableOpacity>
        <TextInput
          style={{
            width: 400,
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 10,
            paddingLeft: 10,
            height: 40,
          }}
          placeholder="Enter Threshold"
          value={threshold}
          onChangeText={txt => setthreshold(txt)}
        />
        <TouchableOpacity
          style={{
            width: '90%',
            borderWidth: 1,
            borderRadius: 15,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: 10,
          }}
          onPress={() => {
            settingthreshold();
          }}>
          <Text style={{color: 'black', fontSize: 18}}>
            Set Patient Threshold
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Adminpanel;
