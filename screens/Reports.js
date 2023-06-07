import {View, Text, Button, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const Reports = ({route, navigation}) => {
  const isFoucsed = useIsFocused();
  const nursedata = useSelector(state => state.nurse);
  const {nurseID} = nursedata.data[0];
  // console.log(nurseID, 'this is logged in nurse id');
  const [reports, setreports] = useState([]);
  const getreports = nurseID => {
    fetch(
      `http://${global.MyVar}/fyp/api/Nursel/Gettingappointments?nurseid=${nurseID}`,
    )
      .then(response => response.json())
      .then(json => {
        // console.log(json);
        setreports(json);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    getreports(nurseID);
  }, []);

  useEffect(() => {
    // Start the interval timer
    const intervalId = setInterval(() => {
      getreports(nurseID);
    }, 10000); // 1000 milliseconds = 1 second

    // Clean up the interval timer when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={{flex: 1}}>
      <Button
        title="Refresh"
        onPress={() => {
          getreports(nurseID);
        }}
      />
      <View>
        <FlatList
          data={reports}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={{
                  width: '90%',
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  margin: 5,
                  alignSelf: 'center',
                  borderRadius: 15,
                }}
                onPress={() => {
                  navigation.navigate('DoneApptDetails', {
                    paramkey: item,
                  });
                }}>
                <Text
                  style={{color: 'purple', fontWeight: '600', fontSize: 20}}>
                  Patient Name: {item.pat.full_name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Reports;
