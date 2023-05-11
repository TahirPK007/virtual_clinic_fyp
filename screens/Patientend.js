import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';

const Patientend = () => {
  const [cnic, setcnic] = useState();
  const [data, setdata] = useState([]);
  const [gettingdate, setgettingdate] = useState([]);
  const [date, setdate] = useState('');
  const filterdata = data.filter(item => {
    return item.p.date == date;
  });

  console.log(filterdata, 'filtered data array');
  console.log(gettingdate, 'appointment array with date');
  const getdata = () => {
    fetch(
      `http://${global.MyVar}/fyp/api/User/GetAllPrescriptions?cnic=${cnic}`,
    )
      .then(response => response.json())
      .then(json => {
        console.log(json);
        setdata(json);
        filterdata(json);
      })
      .catch(error => {
        console.error(error);
      });
  };
  //geting appointments date for the patient who enters cnic
  const getingdate = () => {
    fetch(`http://${global.MyVar}/fyp/api/User/Gettingdate?cnic=${cnic}`)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        setgettingdate(json);
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
          value={cnic}
          onChangeText={val => setcnic(val)}
        />
        <TouchableOpacity
          onPress={() => {
            getdata();
            getingdate();
          }}>
          <Image
            source={require('../images/search.png')}
            style={{width: 25, height: 25}}
          />
        </TouchableOpacity>
      </View>
      <View style={{width: '100%'}}>
        <Picker
          style={{
            backgroundColor: 'white',
            width: '80%',
            marginTop: 10,
            alignSelf: 'center',
          }}
          selectedValue={date}
          onValueChange={value => {
            setdate(value);
          }}>
          <Picker.Item label="Choose Date" />
          {gettingdate.map(item => {
            return <Picker.Item label={item.date} value={item.date} />;
          })}
        </Picker>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginLeft: 5,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{width: '30%'}}>
          <Text style={{color: 'black', fontSize: 15, color: 'purple'}}>
            Medicine Name
          </Text>
        </View>
        <View style={{width: '30%'}}>
          <Text
            style={{
              color: 'black',
              fontSize: 15,
              marginLeft: 15,
              color: 'purple',
            }}>
            Timings
          </Text>
        </View>
        <View style={{width: '30%'}}>
          <Text
            style={{
              color: 'black',
              fontSize: 15,
              marginLeft: 15,
              color: 'purple',
            }}>
            Duration
          </Text>
        </View>
      </View>
      <View>
        <FlatList
          data={filterdata}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 5,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={{width: '30%'}}>
                  <Text style={{color: 'black', fontSize: 15}}>
                    {item.p.medicine_name}
                  </Text>
                </View>
                <View style={{width: '30%'}}>
                  <Text style={{color: 'black', fontSize: 15, marginLeft: 15}}>
                    {item.p.timings}
                  </Text>
                </View>
                <View style={{width: '30%'}}>
                  <Text style={{color: 'black', fontSize: 15, marginLeft: 15}}>
                    {item.p.duration}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Patientend;
