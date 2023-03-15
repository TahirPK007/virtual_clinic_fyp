import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';

const Jrdoc = ({route, navigation}) => {
  //getting logged in jr doc id here
  const jrdocid = route.params.paramkey.jrdoc_id;
  console.log(jrdocid);

  const [data, setdata] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      showingpat();
    }, 3000);
  }, []);

  //this function will fetch the patient details
  const showingpat = async () => {
    try {
      const response = await fetch(
        `http://${global.MyVar}/fyp/api/Jrdoc/MyNewCases?id=${jrdocid}`,
      );
      const mydata = await response.json();
      setdata(mydata);
      console.log(mydata, 'fetched patient');
    } catch (error) {
      console.log(error);
    }
  };

  //logout function it will also set the status to 0
  const logout = async () => {
    await fetch(`http://${global.MyVar}/fyp/api/Jrdoc/Jrlogout?jrdocid=${jrdocid}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(json => {
        if (json === 'logged_out') navigation.navigate('Login');
        else alert('something went wrong');
      });
  };

  return (
    <View style={{flex: 1}}>
      <View style={{alignItems: 'flex-end'}}>
        <TouchableOpacity
          style={{
            backgroundColor: 'black',
            height: 50,
            width: 50,
            borderRadius: 10,
            marginRight: 10,
            justifyContent: 'center',
            marginTop: 10,
          }}
          onPress={logout}>
          <Text style={{color: 'white', textAlign: 'center'}}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 20, color: 'red', fontWeight: 'bold'}}>
          Junior Doctor Name : {route.params.paramkey.full_name}
        </Text>
      </View>
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
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Patientdetails', {paramkey: item})
              }>
              <Text style={{color: 'white'}}>
                Patient Name : {item.p.full_name}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View
        style={{
          widht: '100%',
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}></View>
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
