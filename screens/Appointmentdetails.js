import {View, Text, FlatList, TouchableOpacity} from 'react-native';
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
  //this is the srdoc id to send it back to the main sr doc page to avoid missing id error
  let srdoc_id = route.params.paramkey.srdoc_id;
  console.log(srdoc_id, 'srdoc id to send to main page');
  console.log(aptid, 'apointment id to feth prescriptions');
  console.log(visitid, 'its visit id');

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
      `http://${global.MyVar}/fyp/api/Srdoc/DoneAppointment?aptid=${aptid}&rating=${rating}`,
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
                      fontSize: 27,
                      marginLeft: 20,
                      fontWeight: 'bold',
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
                  <Text style={{color: 'green', marginLeft: 10, marginTop: 5}}>
                    Patient Details
                  </Text>
                  <Text style={{marginTop: 5, color: 'red', marginLeft: 30}}>
                    Patient Name
                  </Text>
                  <Text style={{marginLeft: 40, marginTop: 5, color: 'black'}}>
                    {item.p.full_name}
                  </Text>
                  <Text style={{marginTop: 5, color: 'red', marginLeft: 30}}>
                    D.O.B
                  </Text>
                  <Text style={{marginLeft: 40, marginTop: 5, color: 'black'}}>
                    {item.p.dob}
                  </Text>
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
                      {item.v.blood_pressure}
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
                  <Text style={{marginLeft: 70, color: 'black'}}>
                    {item.v.symptoms.replace(/,/g, '\n')}
                  </Text>
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
          <Text>Fetching Appointment Details</Text>
        )}
      </View>
    </View>
  );
};

export default Appointmentdetails;
