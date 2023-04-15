import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';

const Appointmentdetails = ({route, navigation}) => {
  const [data, setdata] = useState([]);
  let visitid = route.params.paramkey.visit_id;
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

  useEffect(() => {
    setTimeout(() => {
      gettingappointmentdetails(visitid);
    }, 2000);
  }, []);

  return (
    <View>
      <Text>Appointmentdetails</Text>
    </View>
  );
};

export default Appointmentdetails;
