import {View, Text} from 'react-native';
import React from 'react';

const Patientdetails = ({route, navigation}) => {
  return (
    <View style={{flex: 1}}>
      <View>
        <Text sytle={{fontSize: 20, color: 'black'}}>Patient Details</Text>
        <Text>Patient Name : {route.params.paramkey.p.full_name}</Text>
        <Text>Date Of Birth : {route.params.paramkey.p.dob}</Text>
        <Text>Gender : {route.params.paramkey.p.gender}</Text>
      </View>
      <View>
        <Text style={{fontSize: 20, color: 'red', fontWeight: 'bold'}}>
          Vitals
        </Text>
        <Text style={{color: 'green', fontSize: 20, fontWeight: 'bold'}}>
          Blood Pressure : {route.params.paramkey.vv.blood_pressure}
        </Text>
        <Text style={{color: 'green', fontSize: 20, fontWeight: 'bold'}}>
          Patient Name : {route.params.paramkey.vv.sugar}
        </Text>
        <Text style={{color: 'green', fontSize: 20, fontWeight: 'bold'}}>
          Patient Name : {route.params.paramkey.vv.temperature}
        </Text>
      </View>
      <View style={{borderWidth: 2, borderColor: 'black', marginTop: 10}}>
        <Text style={{fontSize: 20, color: 'red', fontWeight: 'bold'}}>
          Symptoms
        </Text>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>
          {route.params.paramkey.vv.symptoms}
        </Text>
      </View>
    </View>
  );
};

export default Patientdetails;