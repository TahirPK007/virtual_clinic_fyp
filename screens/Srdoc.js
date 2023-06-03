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
  console.log(srdocid, 'logged in srdoc id');
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
      console.log(mydata, 'this is api response');
    } catch (error) {
      console.log(error);
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
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          height: 50,
          borderBottomColor: 'green',
          borderBottomWidth: 2,
        }}>
        <Text style={{color: 'black', fontSize: 18, fontWeight: '700'}}>
          Senior Doctor:
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 18,
            fontWeight: '700',
            marginLeft: 10,
          }}>
          {route.params.paramkey.full_name}
        </Text>
      </View>
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
