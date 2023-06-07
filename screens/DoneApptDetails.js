import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';

const DoneApptDetails = ({route, navigation}) => {
  const isFoucsed = useIsFocused();
  const [data, setdata] = useState([]);
  let aptid = route.params.paramkey.a.appointment_id;
  // console.log(aptid, 'appointment id to get prescription');

  const getdoneaptdetails = aptid => {
    fetch(
      `http://${global.MyVar}/fyp/api/Nursel/GettingDoneaptdetails?aptid=${aptid}`,
    )
      .then(response => response.json())
      .then(json => {
        // console.log(json, 'done appointment details');
        setdata(json);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    getdoneaptdetails(aptid);
  }, [isFoucsed]);

  //this function will finish the appointment
  const finishapt = aptid => {
    fetch(
      `http://${global.MyVar}/fyp/api/Nursel/FinishDoneAppointment?aptid=${aptid}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(json => {
        // console.log(json);
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
          flexDirection: 'row',
          marginLeft: 5,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{width: '30%', marginTop: 10}}>
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
      <View style={{marginTop: 5}}>
        <FlatList
          data={data}
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

      <View style={{marginTop: 5}}>
        <Text
          style={{
            color: 'black',
            fontSize: 20,
            fontWeight: '600',
            marginLeft: 20,
          }}>
          Comments/Tests:
        </Text>
        <FlatList
          data={data}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  borderWidth: 1,
                  padding: 5,
                  borderRadius: 10,
                }}>
                <Text style={{color: 'black'}}>{item.t.comments}</Text>
              </View>
            );
          }}
        />
      </View>

      <TouchableOpacity
        style={{
          width: '80%',
          alignSelf: 'center',
          borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: 40,
          borderRadius: 15,
          marginTop: 10,
        }}
        onPress={() => {
          finishapt(aptid);
          navigation.navigate('Reports');
        }}>
        <Text style={{color: 'black', fontSize: 15}}>Done</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: '80%',
          alignSelf: 'center',
          borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: 40,
          borderRadius: 15,
          marginTop: 5,
        }}
        onPress={() => {
          navigation.navigate('Reports');
        }}>
        <Text style={{color: 'black', fontSize: 15}}>Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DoneApptDetails;
