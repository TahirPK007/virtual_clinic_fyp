import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  StyleSheet,
} from 'react-native';
import React, {useState, useEffect} from 'react';

const Patientdetails = ({route, navigation}) => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    // showItem();
  }, []);

  // let imageuri;
  // const showItem = () => {
  //   imageuri = `http://${global.MyVar}/fyp/Content/Uploads/ctn.png`;
  // };

  let imgname = route.params.paramkey.vv.image;

  return (
    <View style={{flex: 1}}>
      <View style={{width: '80%', marginLeft: 20}}>
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
            {route.params.paramkey.vv.blood_pressure}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'red'}}> Sugar</Text>
          <Text style={{marginLeft: 90, textDecorationLine: 'underline'}}>
            {route.params.paramkey.vv.sugar}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'red'}}>Temperature</Text>
          <Text style={{marginLeft: 50, textDecorationLine: 'underline'}}>
            {route.params.paramkey.vv.temperature} F
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
          {route.params.paramkey.vv.symptoms}
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
      </View>
    </View>
  );
};

export default Patientdetails;
