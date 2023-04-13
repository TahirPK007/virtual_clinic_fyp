import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CheckBox from '@react-native-community/checkbox';

const Patientdetails = ({route, navigation}) => {
  const [patid, setpatid] = useState(route.params.paramkey.p.patient_id);
  const [jrdocid, setjrdocid] = useState();
  const [appointmentid, setappointmentid] = useState();
  const [medicine, setmedicine] = useState('');
  const [duartion, setduartion] = useState('');
  const [timings, settimings] = useState('');
  const [visible, setvisible] = useState(false);
  //medicines names
  const [panadol, setpanadol] = useState(false);
  const [flaygyl, setflaygyl] = useState(false);
  const [disable, setdisable] = useState(false);
  const [ten, settendays] = useState('');
  const [prescription, setprescription] = useState([]);

  //timings
  const [morevenig, setmorevenig] = useState('');
  const [morning, setmorning] = useState('');
  const [evening, setevening] = useState('');
  const [night, setnight] = useState('');

  console.log(prescription, 'array to send');
  const settingmeds = () => {
    if (panadol === true) {
      setmedicine('panadol');
    }
    if (flaygyl === true) {
      setmedicine('flaygyl');
    }
  };
  console.log(medicine, 'medicine to send');

  const settingstimings = () => {
    if (morevenig === true) {
      setmorevenig('Morning+Evening+Night');
    }
    if (morning === true) {
      setmorevenig('Morning');
    }
    if (evening === true) {
      setmorevenig('Evening');
    }
    if (night === true) {
      setmorevenig('Night');
    }
  };

  useEffect(() => {
    gettingappointmentid();
  }, []);

  //getting appointment id
  const gettingappointmentid = async () => {
    try {
      const response = await fetch(
        `http://${global.MyVar}/fyp/api/Jrdoc/Gettingappointmentid?patid=${patid}`,
      );
      const mydata = await response.json();

      console.log(mydata, 'this is api response for appointment id');
    } catch (error) {
      console.log(error);
    }
  };
  //sending data to prescription table
  const patprescription = async () => {
    await fetch(`http://${global.MyVar}/fyp/api/Jrdoc/Addingprescription`, {
      method: 'POST',
      body: JSON.stringify(prescription),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
      });
  };

  return (
    <View style={{flex: 1}}>
      <View style={{width: '80%', marginLeft: 20}}>
        <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
          Patient Details:
        </Text>
        <Text style={{color: 'red'}}>Patient Name</Text>
        <Text style={{marginLeft: 20, color: 'black', fontWeight: '600'}}>
          {route.params.paramkey.p.full_name}
        </Text>
        <Text style={{color: 'red'}}>Date Of Birth</Text>
        <Text style={{marginLeft: 20, color: 'black', fontWeight: '600'}}>
          {route.params.paramkey.p.dob}
        </Text>
        <Text style={{color: 'red'}}>Gender</Text>
        <Text style={{marginLeft: 20, color: 'black', fontWeight: '600'}}>
          {route.params.paramkey.p.gender}
        </Text>
      </View>
      <View style={{width: '80%', marginLeft: 20}}>
        <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
          Vitals
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'red'}}>Blood Pressure</Text>
          <Text style={{marginLeft: 38, textDecorationLine: 'underline'}}>
            {route.params.paramkey.v.blood_pressure}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'red'}}> Sugar</Text>
          <Text style={{marginLeft: 90, textDecorationLine: 'underline'}}>
            {route.params.paramkey.v.sugar}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'red'}}>Temperature</Text>
          <Text style={{marginLeft: 50, textDecorationLine: 'underline'}}>
            {route.params.paramkey.v.temperature} F
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            marginTop: 10,
            width: '40%',
            marginLeft: 20,
          }}>
          <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
            Symptoms
          </Text>
          <Text style={{marginLeft: 20, color: 'red', fontWeight: '600'}}>
            {route.params.paramkey.v.symptoms}
          </Text>
        </View>
        <View style={{width: '40%', marginTop: 0, marginLeft: 20}}>
          <Image
            source={{
              uri: route.params.paramkey.v.image,
            }}
            style={{width: 200, height: 150, resizeMode: 'contain'}}
          />
        </View>
      </View>
      <View
        style={{
          widht: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 30,
          marginTop: 30,
        }}>
        <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
          Prescription
        </Text>
        <Modal visible={visible}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CheckBox
                disabled={disable}
                value={panadol}
                onValueChange={value => {
                  setpanadol(value);
                  setdisable(true);
                }}
              />
              <Text>Panadol</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CheckBox
                disabled={disable}
                value={flaygyl}
                onValueChange={value => {
                  setflaygyl(value);
                  setdisable(true);
                }}
              />
              <Text>Flaygyl</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'absolute',
                bottom: 0,
                height: 70,
                alignSelf: 'center',
                paddingLeft: 90,
                paddingRight: 90,
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderRadius: 10,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '30%',
                }}
                onPress={() => {
                  setvisible(false);
                }}>
                <Text style={{color: 'black'}}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderRadius: 10,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '30%',
                }}
                onPress={() => {
                  settingmeds();
                  setvisible(false);
                }}>
                <Text style={{color: 'black'}}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* this is the modal for timings */}

        <Modal visible={visible}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Choose the Timings for Medicine</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CheckBox
                disabled={disable}
                value={panadol}
                onValueChange={value => {
                  setduartion(value);
                  setdisable(true);
                }}
              />
              <Text>5-Days</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CheckBox
                disabled={disable}
                value={flaygyl}
                onValueChange={value => {
                  setflaygyl(value);
                  setdisable(true);
                }}
              />
              <Text>10-Days</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'absolute',
                bottom: 0,
                height: 70,
                alignSelf: 'center',
                paddingLeft: 90,
                paddingRight: 90,
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderRadius: 10,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '30%',
                }}
                onPress={() => {
                  setvisible(false);
                }}>
                <Text style={{color: 'black'}}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderRadius: 10,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '30%',
                }}
                onPress={() => {
                  settingmeds();
                  setvisible(false);
                }}>
                <Text style={{color: 'black'}}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View
          style={{
            flexDirection: 'row',
            widht: '100%',
            height: 90,

            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              borderWidth: 1,
              height: 40,
              width: '30%',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              setvisible(true);
            }}>
            <Text style={{color: 'black'}}>Choose Medicine</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              borderWidth: 1,
              height: 40,
              width: '30%',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              setvisible(true);
            }}>
            <Text style={{color: 'black'}}>Duration</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              borderWidth: 1,
              height: 40,
              width: '30%',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'black'}}>Timings</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'mediumseagreen',
            height: 40,
            width: 300,
            borderRadius: 10,
          }}
          onPress={() => {
            console.log('called');
            setprescription([
              ...prescription,
              {
                appointment_id: 1,
                medicine_name: 'panadol',
                duration: '1month',
                timings: 'moring+evening+night',
              },
            ]);
            setmedicine('');
            setduartion('');
            settimings('');
          }}>
          <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
            Add
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
            height: 30,
            width: 120,
            backgroundColor: 'white',
            borderWidth: 2,
          }}
          onPress={() => {
            patprescription();
          }}>
          <Text>Done</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 5}}>
        <FlatList
          data={prescription}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  width: '90%',
                  height: 50,
                  borderWidth: 2,
                  backgroundColor: 'white',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}>
                <Text style={{color: 'black', fontWeight: '500', fontSize: 18}}>
                  {item.medicine_name}
                </Text>
                <Text style={{color: 'black', fontWeight: '500', fontSize: 18}}>
                  {item.duration}
                </Text>
                <Text style={{color: 'black', fontWeight: '500', fontSize: 18}}>
                  {item.timings}
                </Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Patientdetails;
