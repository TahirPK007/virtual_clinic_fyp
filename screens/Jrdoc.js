import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';

const Jrdoc = () => {
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
      <FlatList
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
            <Text style={{color: 'white'}}> {item.full_name} : Patient Name</Text>
            <Text style={{color: 'white'}}> {item.gender} : Patient gender</Text>
            <Text style={{color: 'white'}}> {item.dob} : Patient gender</Text>
            <Text style={{color: 'white'}}> {item.v.blood_pressure}: Patient Bloodpressure</Text>
            <Text style={{color: 'white'}}> {item.v.sugar} : Patient Sugar</Text>
          </View>
        )}
      />
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
