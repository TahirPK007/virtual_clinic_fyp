import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {useNavigation} from '@react-navigation/native';

const Appointmentdetails = ({route}) => {
  const navigation = useNavigation();

  const [data, setdata] = useState(null);
  const [presdetails, setpresdetails] = useState(null);

  const [rating, setrating] = useState();
  console.log(rating, 'rating given');

  let visitid = route.params.paramkey.visit_id;
  let aptid = route.params.paramkey.appointment_id;
  let patid = route.params.paramkey.patient_id;
  console.log(aptid, 'apointment id to feth prescriptions');
  console.log(visitid, 'its visit id');
  console.log(patid, 'pat id to update vitals rated');

  //getting appointment details
  const gettingappointmentdetails = async visitid => {
    try {
      const response = await fetch(
        `http://${global.MyVar}/fyp/api/Srdoc/AppointmentDetails?visitid=${visitid}`,
      );
      const mydata = await response.json();
      setdata(mydata);
      console.log(mydata, 'this is api response for appointment details');
    } catch (error) {
      console.log(error);
    }
  };

  //getting prescription detials according to current appointment
  const gettingprescriptiondetailsdetails = async aptid => {
    try {
      const response = await fetch(
        `http://${global.MyVar}/fyp/api/Srdoc/Getpresdetails?aptid=${aptid}`,
      );
      const mydata = await response.json();
      setpresdetails(mydata);
      console.log(
        mydata,
        'this is api response for prescription details details',
      );
    } catch (error) {
      console.log(error);
    }
  };

  //done appointment it will give rating and set status to 1 for the current appointment
  const donecurrentappointment = async (aptid, rating) => {
    fetch(
      `http://${global.MyVar}/fyp/api/Srdoc/DoneAppointment?aptid=${aptid}&rating=${rating}&patid=${patid}`,
      {
        method: 'POST',
        // body: JSON.stringify({
        //   patient_id: `${data.apt.patient_id}`,
        //   jrdoc_id: `${data.apt.jrdoc_id}`,
        //   date: `${data.apt.date}`,
        //   time: `${data.apt.time}`,
        //   srdoc_id: `${data.apt.srdoc_id}`,
        //   visit_id: `${data.apt.visit_id}`,
        // }),
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
      gettingappointmentdetails(visitid);
      gettingprescriptiondetailsdetails(aptid);
    }, 2000);
  }, []);

  return (
    <View style={{flex: 1}}>
      <View>
        {data && presdetails ? (
          <FlatList
            data={data}
            renderItem={({item, index}) => {
              return (
                <View style={{}}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 20,
                      alignSelf: 'center',
                      fontWeight: '700',
                      marginTop: 10,
                    }}>
                    {'Jr Doc: ' + item.jr.full_name}
                  </Text>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      width: '90%',
                      alignSelf: 'center',
                      marginTop: 5,
                    }}></View>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 20,
                      fontWeight: '700',
                      marginLeft: 15,
                    }}>
                    Patient Details:
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{marginTop: 5, color: 'red', marginLeft: 30}}>
                      Patient Name
                    </Text>
                    <Text
                      style={{marginLeft: 40, marginTop: 5, color: 'black'}}>
                      {item.p.full_name}
                    </Text>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Text style={{marginTop: 5, color: 'red', marginLeft: 30}}>
                      D.O.B
                    </Text>
                    <Text
                      style={{marginLeft: 40, marginTop: 5, color: 'black'}}>
                      {item.p.dob}
                    </Text>
                  </View>
                  <Text style={{marginTop: 5, color: 'red', marginLeft: 30}}>
                    Gender
                  </Text>
                  <Text style={{marginLeft: 40, marginTop: 5, color: 'black'}}>
                    {item.p.gender}
                  </Text>
                  <View
                    style={{
                      width: '90%',
                      borderBottomWidth: 1,
                      alignSelf: 'center',
                      marginTop: 5,
                    }}></View>
                  <Text style={{color: 'green', marginLeft: 10, marginTop: 5}}>
                    Vitals
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{marginTop: 5, color: 'red', marginLeft: 30}}>
                      Blood Pressure
                    </Text>
                    <Text
                      style={{
                        marginLeft: 40,
                        marginTop: 5,
                        color: 'black',
                        textDecorationLine: 'underline',
                      }}>
                      {`Systolic: ${item.v.systolic} | Diastolic: ${item.v.diastolic}`}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{marginTop: 5, color: 'red', marginLeft: 30}}>
                      Sugar
                    </Text>
                    <Text
                      style={{
                        marginLeft: 40,
                        marginTop: 5,
                        color: 'black',
                        textDecorationLine: 'underline',
                        paddingLeft: 60,
                      }}>
                      {item.v.sugar}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{marginTop: 5, color: 'red', marginLeft: 30}}>
                      Temperature
                    </Text>
                    <Text
                      style={{
                        marginLeft: 40,
                        marginTop: 5,
                        color: 'black',
                        textDecorationLine: 'underline',
                        paddingLeft: 18,
                      }}>
                      {item.v.temperature}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      width: '90%',
                      alignSelf: 'center',
                      marginTop: 5,
                    }}></View>
                  <Text style={{color: 'green', marginLeft: 10, marginTop: 5}}>
                    Symptoms
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{marginLeft: 70, color: 'black'}}>
                      {item.v.symptoms.replace(/,/g, '\n')}
                    </Text>
                    <Image
                      source={{uri: item.v.image}}
                      style={{height: 90, width: 100, marginLeft: 100}}
                    />
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 1,
                      width: '90%',
                      alignSelf: 'center',
                      marginTop: 5,
                    }}></View>
                  <Text style={{color: 'green', marginLeft: 10, marginTop: 5}}>
                    Prescription
                  </Text>
                  <View>
                    {presdetails.map(item => {
                      return (
                        <View style={{flexDirection: 'row', marginLeft: 60}}>
                          <Text style={{color: 'black', marginLeft: 10}}>
                            {item.medicine_name}
                          </Text>
                          <Text style={{color: 'black', marginLeft: 40}}>
                            {item.duration}
                          </Text>
                          <Text style={{color: 'black', marginLeft: 50}}>
                            {item.timings}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      width: '90%',
                      alignSelf: 'center',
                      marginTop: 5,
                    }}></View>
                  <Text style={{color: 'green', marginLeft: 10, marginTop: 5}}>
                    Time
                  </Text>
                  <Text style={{color: 'black', marginLeft: 70}}>
                    {item.ac.time}
                  </Text>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      width: '90%',
                      alignSelf: 'center',
                      marginTop: 5,
                    }}></View>
                  <Text
                    style={{
                      color: 'green',
                      marginTop: 5,
                      alignSelf: 'center',
                      fontWeight: '600',
                      fontSize: 20,
                    }}>
                    Give Rating
                  </Text>

                  <View>
                    <Rating
                      showRating
                      startingValue={0}
                      // tintColor="green"
                      // fractions={1}
                      onFinishRating={value => {
                        setrating(value);
                      }}
                      style={{paddingVertical: 1}}
                    />
                  </View>
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'white',
                      width: '80%',
                      alignSelf: 'center',
                      marginTop: 10,
                      height: 40,
                      borderRadius: 10,
                      borderWidth: 1,
                    }}
                    onPress={() => {
                      donecurrentappointment(aptid, rating);
                      navigation.goBack();
                    }}>
                    <Text style={{color: 'black', fontSize: 15}}>Done</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        ) : (
          <Text
            style={{
              color: 'black',
              fontSize: 20,
              alignSelf: 'center',
              marginTop: '70%',
            }}>
            Fetching Appointment Details...
          </Text>
        )}
      </View>
    </View>
  );
};

export default Appointmentdetails;
