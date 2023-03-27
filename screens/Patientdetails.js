import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';

const Patientdetails = ({route, navigation}) => {
  const [prescription, setprescription] = useState('');
  useEffect(() => {
    // showItem();
  }, []);

  // let imageuri;
  // const showItem = () => {
  //   imageuri = `http://${global.MyVar}/fyp/Content/Uploads/ctn.png`;
  // };

  // let imgname = route.params.paramkey.v.image;

  return (
    <View style={{flex: 1}}>
      {/* <View style={{width: '80%', marginLeft: 20}}>
        <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
          Patient Details:
        </Text>
        <Text style={{color: 'red'}}>Patient Name</Text>
        <Text style={{marginLeft: 20, color: 'black', fontWeight: '600'}}>
          {route.params.paramkey.p.full_name}
        </Text>
        <Text style={{color: 'red'}}>Date Of Birth</Text>
        <Text style={{marginLeft: 20, color: 'black', fontWeight: '600'}}>
          {route.params.paramkey.p.dob}
        </Text>
        <Text style={{color: 'red'}}>Gender</Text>
        <Text style={{marginLeft: 20, color: 'black', fontWeight: '600'}}>
          {route.params.paramkey.p.gender}
        </Text>
      </View>
      <View style={{width: '80%', marginLeft: 20}}>
        <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
          Vitals
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'red'}}>Blood Pressure</Text>
          <Text style={{marginLeft: 38, textDecorationLine: 'underline'}}>
            {route.params.paramkey.v.blood_pressure}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'red'}}> Sugar</Text>
          <Text style={{marginLeft: 90, textDecorationLine: 'underline'}}>
            {route.params.paramkey.v.sugar}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'red'}}>Temperature</Text>
          <Text style={{marginLeft: 50, textDecorationLine: 'underline'}}>
            {route.params.paramkey.v.temperature} F
          </Text>
        </View>
      </View>
      <View style={{flexDirection:'row'}}>
      <View
        style={{
          marginTop: 10,
          width: '40%',
          marginLeft: 20,
        }}>
        <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
          Symptoms
        </Text>
        <Text style={{marginLeft: 20, color: 'red', fontWeight: '600'}}>
          {route.params.paramkey.v.symptoms}
        </Text>
      </View>
      <View style={{width:"40%",marginTop:30,marginLeft:30}}>
      <Image
        source={{
          uri: `http://${global.MyVar}/fyp/Content/Uploads/${imgname}`,
        }}
        style={{width: 100, height: 100, resizeMode: 'contain'}}
      />
      </View>
      </View> */}
      <View
        style={{
          widht: '80%',
          justifyContent: 'center',
          // alignItems: 'center',
          marginLeft: 30,
        }}>
        <Text style={{color: 'black', fontSize: 20}}>Prescription</Text>
        <TextInput
          style={{
            marginTop: 10,
            borderWidth: 2,
            borderColor: 'black',
            paddingLeft: 20,
            borderRadius: 20,
            width: 300,
            backgroundColor: 'white',
            elevation: 1,
          }}
          placeholder="Enter Medicine"
          multiline={true}
          numberOfLines={4}
          value={prescription}
          onChangeText={value => {
            setprescription(value);
          }}
        />
      </View>
      <View
        style={{
          width: '80%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'green',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            height: 35,
            width: 100,
          }}
          onPress={() => chooseFile('photo')}>
          <Text style={{color: 'white'}}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Patientdetails;
