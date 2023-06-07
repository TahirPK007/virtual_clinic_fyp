import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';

const Srdoc = ({route}) => {
  const navigation = useNavigation();
  const ref = useRef();
  const isFocused = useIsFocused();
  let srdocid = route.params.paramkey.srdoc_id;
  // console.log(srdocid, 'logged in srdoc id');
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(false);

  //this function will get the assigned appointments
  const appointments = async () => {
    try {
      const response = await fetch(
        `http://${global.MyVar}/fyp/api/Srdoc/MyNewAppointments?id=${srdocid}`,
      );
      const mydata = await response.json();
      setdata(mydata);
      // console.log(mydata, 'this is api response');
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    appointments();
  }, [isFocused]);

  useEffect(() => {
    // Start the interval timer
    const intervalId = setInterval(() => {
      appointments();
    }, 10000); // 1000 milliseconds = 1 second

    // Clean up the interval timer when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  const reloading = () => {
    setloading(true);
    appointments();
    setloading(false);
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: 'green',
          backgroundColor: 'white',
          height: 60,
          padding: 10,
        }}>
        <Text
          style={{
            marginLeft: 10,
            fontSize: 20,
            fontWeight: '600',
            color: 'black',
          }}>
          SrDoc: {route.params.paramkey.full_name}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: 'green',
            marginRight: 10,
            width: 70,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
            height: 30,
          }}
          onPress={() => {}}>
          <Text style={{color: 'white'}}>Logout</Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontSize: 30,
          color: 'red',
          marginLeft: 20,
          fontWeight: '500',
          alignSelf: 'center',
          borderWidth: 1,
          width: 400,
          textAlign: 'center',
          borderRadius: 10,
          backgroundColor: 'white',
          padding: 5,
          marginTop: 10,
          marginBottom: 10,
        }}>
        Appointments To Rate
      </Text>
      <RefreshControl
        style={{flex: 1}}
        refreshing={loading}
        onRefresh={() => {
          reloading();
        }}>
        {data !== null ? (
          <View style={{marginTop: 10}}>
            <FlatList
              data={data}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={{
                      width: '90%',
                      height: 40,
                      backgroundColor: 'white',
                      marginTop: 5,
                      justifyContent: 'center',
                      borderWidth: 2,
                      alignSelf: 'center',
                    }}
                    onPress={() => {
                      navigation.navigate('Appointmentdetails', {
                        paramkey: item,
                      });
                    }}>
                    <Text style={{color: 'black', marginLeft: 20}}>
                      {'Appointment -' + (index + 1)}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        ) : (
          <Text
            style={{
              color: 'black',
              fontSize: 30,
              alignSelf: 'center',
              marginTop: 300,
              fontWeight: '600',
            }}>
            No Appointments To Rate
          </Text>
        )}
      </RefreshControl>
    </View>
  );
};

export default Srdoc;
