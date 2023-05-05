import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const Adminpanel = ({navigation}) => {
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
      </View>
    </View>
  );
};

export default Adminpanel;
