import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';

const Srdoc = ({route, navigation}) => {
  let srdocid = route.params.paramkey.srdoc_id;
  console.log(srdocid, 'logged in srdoc id');
  const [data, setdata] = useState([]);
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
  }, []);

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
            height: 50,
            flexDirection: 'row',
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 2,
            borderBottomColor: 'green',
          }}>
          <Text style={{color: 'black', fontSize: 18, fontWeight: '700'}}>
            Senior Doctor:
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontWeight: '700',
              marginLeft: 20,
            }}>
            {route.params.paramkey.full_name}
          </Text>
        </View>
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
                    navigation.navigate('Appointmentdetails', {paramkey: item});
                  }}>
                  <Text style={{color: 'black', marginLeft: 20}}>
                    {'Appointment ' + (index + 1)}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </RefreshControl>
    </View>
  );
};

export default Srdoc;
