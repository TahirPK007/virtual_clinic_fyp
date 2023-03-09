import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';

const Jrdoc = ({navigation}) => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    showingpat();
  }, []);

  const showingpat = async () => {
    try {
      const response = await fetch(
        'http://10.0.2.2/fyp/api/Nursel/Fetchpatvit',
      );
      const mydata = await response.json();
      setdata(mydata);
      console.log(mydata);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      {/* <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View
            style={{
              backgroundColor: 'black',
              margin: 10,
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white'}}>Patient Name : {item.full_name}</Text>
          </View>
        )}
      /> */}
      <View
        style={{
          widht: '100%',
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {data.map(item => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Patientdetails', {paramkey: item})
              }>
              <Text
                style={{
                  color: 'black',
                  fontSize: 20,
                  backgroundColor: 'yellow',
                  marginTop: 10,
                }}>
                Patient Name:{item.full_name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default Jrdoc;

const styles = StyleSheet.create({
  txt: {
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 20,
  },
});
