import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';

const Jrdoc = ({route, navigation}) => {
  const isFoucsed = useIsFocused();
  //getting logged in jr doc id here
  var jrdocid = route.params.paramkey.jrdoc_id;
  // console.log(jrdocid, 'jrdoc id to send');

  const [data, setdata] = useState([]);

  console.log(data, 'this is pateint data array');
  const [patid, setpatid] = useState();
  const [visitid, setvisitid] = useState();
  const [nurseid, setnurseid] = useState();
  const [loading, setloading] = useState(false);

  console.log(patid, 'patid to send');
  console.log(visitid, 'visit id to send');
  console.log(nurseid, 'nurseeee id to send');

  //logic for refreshing
  const reloading = () => {
    setloading(true);
    showingpat();
    setloading(false);
  };
  //this function will fetch the patient details
  const showingpat = async () => {
    try {
      const response = await fetch(
        `http://${global.MyVar}/fyp/api/Jrdoc/MyNewCases?id=${jrdocid}`,
      );
      const mydata = await response.json();
      setdata(mydata);
      //gettting patid to send it to api function that will be using in acceptedcase
      setpatid(mydata[0].p.patient_id);
      //gettting visitid to send it to api function that will be using in acceptedcase
      setvisitid(mydata[0].x.visit_id);
      setnurseid(mydata[0].x.nurseID);
      console.log(mydata, 'this is api response');
    } catch (error) {
      console.log(error);
    }
  };

  //logout function it will also set the logged in jrdoc status to 0
  const logout = async () => {
    await fetch(
      `http://${global.MyVar}/fyp/api/Jrdoc/Jrlogout?jrdocid=${jrdocid}`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    )
      .then(response => response.json())
      .then(json => {
        if (json === 'logged_out') navigation.navigate('Login');
        else alert('something went wrong');
      });
  };

  //this function will populate the acceptcase table when the junior doctor will accept the case.
  const acceptcase = () => {
    fetch(
      `http://${global.MyVar}/fyp/api/Jrdoc/AcceptedCase?jrdocid=${jrdocid}&patid=${patid}&visitid=${visitid}`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    )
      .then(response => response.json())
      .then(json => console.log(json));
  };
  //populating data to appointment table
  const addingappointment = () => {
    fetch(
      `http://${global.MyVar}/fyp/api/Jrdoc/Appointment?jrdocid=${jrdocid}&patid=${patid}&visitid=${visitid}&nurseid=${nurseid}`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    )
      .then(response => response.json())
      .then(json => console.log(json));
  };

  //this function is getting the average rating from appointment table and assigning it to the logged in junior doctor
  const assigningrating = () => {
    fetch(
      `http://${global.MyVar}/fyp/api/Jobs/CalculateRatingAndAssingToJrdoc?jrdocid=${jrdocid}`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    )
      .then(response => response.json())
      .then(json => console.log(json));
  };

  useEffect(() => {
    assigningrating();
    showingpat();
  }, [isFoucsed]);

  useEffect(() => {
    // Start the interval timer
    const intervalId = setInterval(() => {
      showingpat();
    }, 12000); // 1000 milliseconds = 1 second

    // Clean up the interval timer when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

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
          JrDoc: {route.params.paramkey.full_name}
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
          onPress={logout}>
          <Text style={{color: 'white'}}>Logout</Text>
        </TouchableOpacity>
      </View>
      <RefreshControl
        style={{flex: 1}}
        refreshing={loading}
        onRefresh={() => {
          reloading();
        }}>
        <View style={{marginTop: 10, width: '100%'}}>
          <Text
            style={{
              fontSize: 40,
              color: 'red',
              marginLeft: 20,
              fontWeight: '600',
              alignSelf: 'center',
              borderWidth: 1,
              width: 400,
              textAlign: 'center',
              borderRadius: 10,
              backgroundColor: 'white',
              padding: 5,
              marginBottom: 10,
            }}>
            Cases
          </Text>
          {data != 'no new cases' ? (
            <View>
              <FlatList
                data={data}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1,
                        height: 50,
                        width: '90%',
                        alignSelf: 'center',
                        elevation: 1,
                        backgroundColor: 'white',
                      }}
                      onPress={() => {
                        acceptcase();
                        addingappointment();
                        navigation.navigate('Patientdetails', {paramkey: item});
                      }}>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 20,
                          fontWeight: '600',
                          elevation: 1,
                        }}>
                        Patient Name : {item.p.full_name}
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
                alignSelf: 'center',
                marginTop: 300,
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              No New Cases
            </Text>
          )}
        </View>
      </RefreshControl>
    </View>
  );
};

export default Jrdoc;
