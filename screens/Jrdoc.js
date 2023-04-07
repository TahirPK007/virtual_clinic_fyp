import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';

const Jrdoc = ({route, navigation}) => {
  //getting logged in jr doc id here
  var jrdocid = route.params.paramkey.jrdoc_id;
  console.log(jrdocid, 'jrdoc id to send');

  const [data, setdata] = useState(null);
  const [patid, setpatid] = useState();
  const [visitid, setvisitid] = useState();
  const [refreshing, setRefreshing] = useState(false);

  // //gettting patid to send it to api function that will be using in acceptedcase
  // setpatid(mydata[0].p.patient_id);
  // //gettting visitid to send it to api function that will be using in acceptedcase
  // setvisitid(mydata[0].x.visit_id);

  //this function will fetch the patient details
  const showingpat = async () => {
    try {
      const response = await fetch(
        `http://${global.MyVar}/fyp/api/Jrdoc/MyNewCases?id=${jrdocid}`,
      );
      const mydata = await response.json();
      setdata(mydata);
      console.log(mydata, 'this is api response');
    } catch (error) {
      console.log(error);
    }
  };

  console.log(patid, 'patid to send');
  console.log(visitid, 'visit id to send');

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

  useEffect(() => {
    setTimeout(() => {
      showingpat();
    }, 3000);
  }, []);

  const handlerefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    // refreshControl={
    //     <RefreshControl
    //       onRefresh={() => {
    //         handlerefresh();
    //       }}
    //       refreshing={refreshing}
    //     />
    //   }
    <View style={{flex: 1}}>
      <View
        style={{
          width: '100%',
          height: 70,
          borderBottomColor: 'black',
          borderWidth: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            marginLeft: 10,
            fontSize: 20,
            fontWeight: '600',
            color: 'black',
          }}>
          Junior Doctor: {route.params.paramkey.full_name}
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: 'green',
            marginRight: 10,
            height: 35,
            width: 70,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
          }}
          onPress={logout}>
          <Text style={{color: 'white'}}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  acceptcase();
                  navigation.navigate('Patientdetails', {paramkey: item});
                }}>
                <Text style={{color: 'white'}}>
                  Patient Name : {item.p.full_name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
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
