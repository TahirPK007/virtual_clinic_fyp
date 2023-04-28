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
import {useNavigation} from '@react-navigation/native';

const Patientdetails = ({route}) => {
  const navigation = useNavigation();
  const [patid, setpatid] = useState(route.params.paramkey.p.patient_id);
  const [vital_id, setvital_id] = useState(route.params.paramkey.v.vital_id);
  const [jrdocid, setjrdocid] = useState();
  const [appointmentid, setappointmentid] = useState();

  //main prescription array
  const [prescription, setprescription] = useState([]);
  console.log(prescription, 'array to send');

  //modal visibilty
  const [visible, setvisible] = useState(false);
  const [visible1, setvisible1] = useState(false);
  const [visible2, setvisible2] = useState(false);
  //modal disablility
  const [disable, setdisable] = useState(false);
  const [disable1, setdisable1] = useState(false);
  const [disable2, setdisable2] = useState(false);
  //medicines modal
  const [medicine, setmedicine] = useState('');
  const [panadol, setpanadol] = useState(false);
  const [Paracetamol, setParacetamol] = useState(false);
  const [Ibuprofen, setIbuprofen] = useState(false);
  const [flaygyl, setflaygyl] = useState(false);
  //duration modal
  const [duartion, setduartion] = useState('');
  const [days5, setdays5] = useState(false);
  const [days10, setdays10] = useState(false);
  const [days15, setdays15] = useState(false);
  const [days30, setdays30] = useState(false);

  //timings
  const [timings, settimings] = useState('');
  const [morevenig, setmorevenig] = useState(false);
  const [morning, setmorning] = useState(false);
  const [evening, setevening] = useState(false);
  const [night, setnight] = useState(false);

  const settingmeds = () => {
    if (panadol === true) {
      setmedicine('Panadol');
    }
    if (Paracetamol === true) {
      setmedicine('Paracetamol');
    }
    if (Ibuprofen === true) {
      setmedicine('Ibuprofen');
    }
    if (flaygyl === true) {
      setmedicine('Flaygyl');
    }
  };

  const settingduration = () => {
    if (days5 === true) {
      setduartion('5-days');
    }
    if (days10 === true) {
      setduartion('10-days');
    }
    if (days15 === true) {
      setduartion('15-days');
    }
    if (days30 === true) {
      setduartion('30-days');
    }
  };

  const settingstimings = () => {
    if (morevenig === true) {
      settimings('Morning+Evening+Night');
    }
    if (morning === true) {
      settimings('Morning Only');
    }
    if (evening === true) {
      settimings('Evening Only');
    }
    if (night === true) {
      settimings('Night Only');
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
      setappointmentid(mydata);
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

  //upadting current patients's vitals status to prevent it from refetching
  const updatingvitalstatus = async () => {
    await fetch(
      `http://${global.MyVar}/fyp/api/Jrdoc/Updatingvitalstatus?vitalid=${vital_id}`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    )
      .then(response => response.json())
      .then(json => {
        console.log(json);
      });
  };

  return (
    <ScrollView>
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
          {/* this is the modal for medicines */}
          <Modal visible={visible}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text>Choose Medicine</Text>
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
                  value={Paracetamol}
                  onValueChange={value => {
                    setParacetamol(value);
                    setdisable(true);
                  }}
                />
                <Text>Paracetamol</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CheckBox
                  disabled={disable}
                  value={Ibuprofen}
                  onValueChange={value => {
                    setIbuprofen(value);
                    setdisable(true);
                  }}
                />
                <Text>Ibuprofen</Text>
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

          {/* this is the modal for duration */}
          <Modal visible={visible1}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text>Choose Duration</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CheckBox
                  disabled={disable1}
                  value={days5}
                  onValueChange={value => {
                    setdays5(value);
                    setdisable1(true);
                  }}
                />
                <Text>5-Days</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CheckBox
                  disabled={disable1}
                  value={days10}
                  onValueChange={value => {
                    setdays10(value);
                    setdisable1(true);
                  }}
                />
                <Text>10-Days</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CheckBox
                  disabled={disable1}
                  value={days15}
                  onValueChange={value => {
                    setdays15(value);
                    setdisable1(true);
                  }}
                />
                <Text>15-Days</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CheckBox
                  disabled={disable1}
                  value={days30}
                  onValueChange={value => {
                    setdays30(value);
                    setdisable1(true);
                  }}
                />
                <Text>30-Days</Text>
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
                    setvisible1(false);
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
                    settingduration();
                    setvisible1(false);
                  }}>
                  <Text style={{color: 'black'}}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* this is the modal for timings */}

          <Modal visible={visible2}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text>Choose the Timings</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CheckBox
                  disabled={disable2}
                  value={morevenig}
                  onValueChange={value => {
                    setmorevenig(value);
                    setdisable2(true);
                  }}
                />
                <Text>Morning+Evening+Night</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CheckBox
                  disabled={disable2}
                  value={morning}
                  onValueChange={value => {
                    setmorning(value);
                    setdisable2(true);
                  }}
                />
                <Text>Morning Only</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CheckBox
                  disabled={disable2}
                  value={evening}
                  onValueChange={value => {
                    setevening(value);
                    setdisable2(true);
                  }}
                />
                <Text>Evening Only</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CheckBox
                  disabled={disable2}
                  value={night}
                  onValueChange={value => {
                    setnight(value);
                    setdisable2(true);
                  }}
                />
                <Text>Night Only</Text>
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
                    setvisible2(false);
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
                    settingstimings();
                    setvisible2(false);
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
              <Text style={{color: 'black'}}>Medicine</Text>
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
                setvisible1(true);
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
              }}
              onPress={() => {
                setvisible2(true);
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
              setprescription([
                ...prescription,
                {
                  appointment_id: appointmentid,
                  medicine_name: medicine,
                  duration: duartion,
                  timings: timings,
                },
              ]);
              setmedicine('');
              setduartion('');
              settimings('');
              setdisable(false);
              setdisable1(false);
              setdisable2(false);
              setmorevenig(false);
              setmorning(false);
              setevening(false);
              setnight(false);
              setdays5(false);
              setdays10(false);
              setdays15(false);
              setdays30(false);
              setpanadol(false);
              setParacetamol(false);
              setIbuprofen(false);
              setflaygyl(false);
            }}>
            <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
              Add
            </Text>
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
                    height: 40,
                    borderWidth: 2,
                    backgroundColor: 'white',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={{color: 'black', fontWeight: '500', fontSize: 18}}>
                    {item.medicine_name}
                  </Text>
                  <Text
                    style={{color: 'black', fontWeight: '500', fontSize: 18}}>
                    {item.duration}
                  </Text>
                  <Text
                    style={{color: 'black', fontWeight: '500', fontSize: 18}}>
                    {item.timings}
                  </Text>
                </View>
              );
            }}
          />
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'mediumseagreen',
              height: 40,
              width: 300,
              borderRadius: 10,
              marginTop: 5,
              alignSelf: 'center',
            }}
            onPress={() => {
              patprescription();
              updatingvitalstatus();
              navigation.goBack();
            }}>
            <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
              Done
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Patientdetails;
