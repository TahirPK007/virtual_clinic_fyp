import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import React from 'react';

const Patientend = () => {
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
          Patient Data
        </Text>
      </View>
      <View
        style={{
          width: '90%',
          borderWidth: 1,
          borderRadius: 15,
          alignSelf: 'center',
          marginTop: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TextInput
          style={{width: '87%', marginLeft: 10}}
          placeholder="Enter Your Cnic"
        />
        <TouchableOpacity>
          <Image
            source={require('../images/search.png')}
            style={{width: 25, height: 25}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Patientend;
