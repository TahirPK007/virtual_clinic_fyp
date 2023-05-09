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

  const reloading = () => {
    setloading(true);
    appointments();
    setloading(false);
  };

  return (
    <View style={{flex: 1}}>
      <RefreshControl
        style={{flex: 1}}
        refreshing={loading}
        onRefresh={() => {
          reloading();
        }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
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
        {data ? (
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
          <Text>No New Appointments</Text>
        )}
      </RefreshControl>
    </View>
  );
};

export default Srdoc;
