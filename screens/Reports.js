import {View, Text, Button, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

const Reports = ({route, navigation}) => {
  const [reports, setreports] = useState([]);
  const getreports = () => {
    fetch(`http://${global.MyVar}/fyp/api/Nursel/Gettingappointments`)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        setreports(json);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    getreports();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Button title="Refresh" onPress={getreports} />
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
