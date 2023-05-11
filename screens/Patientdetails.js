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

  //timings modal
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
        <View
          style={{
            width: '100%',
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'black', fontSize: 25, fontWeight: '600'}}>
            Patient Details
          </Text>
        </View>
        <View style={{width: '100%', marginLeft: 20, marginTop: 10}}>
          <View
            style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
            <Text style={{color: 'purple', fontWeight: '600', fontSize: 18}}>
              Patient Name:
            </Text>
            <Text style={{marginLeft: 10, color: 'black', fontWeight: '600'}}>
              {route.params.paramkey.p.full_name}
            </Text>
          </View>

          <View
            style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
            <Text style={{color: 'purple', fontWeight: '600', fontSize: 18}}>
              Date Of Birth:
            </Text>
            <Text style={{marginLeft: 10, color: 'black', fontWeight: '600'}}>
              {route.params.paramkey.p.dob}
            </Text>
          </View>

          <View
            style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
            <Text style={{color: 'purple', fontWeight: '600', fontSize: 18}}>
              Gender:
            </Text>
            <Text style={{marginLeft: 10, color: 'black', fontWeight: '600'}}>
              {route.params.paramkey.p.gender}
            </Text>
          </View>
          <Text style={{color: 'purple', fontWeight: '600', fontSize: 18}}>
            Vitals:
          </Text>
          <View style={{width: '100%', marginLeft: 30}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: 'green'}}>Blood Pressure:</Text>
              <Text style={{textDecorationLine: 'underline', marginLeft: 10}}>
                {`${route.params.paramkey.v.systolic} | ${route.params.paramkey.v.diastolic}`}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: 'green'}}> Sugar:</Text>
              <Text style={{marginLeft: 10, textDecorationLine: 'underline'}}>
                {route.params.paramkey.v.sugar}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: 'green'}}>Temperature:</Text>
              <Text style={{marginLeft: 10, textDecorationLine: 'underline'}}>
                {route.params.paramkey.v.temperature}
              </Text>
            </View>
          </View>
          <Text style={{color: 'purple', fontWeight: '600', fontSize: 18}}>
            Symptoms:
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{marginLeft: 20, color: 'red', fontWeight: '600'}}>
              {route.params.paramkey.v.symptoms.replace(/,/g, '\n')}
            </Text>
            {route.params.paramkey.v.image == null ? null : (
              <Image
                source={{
                  uri: route.params.paramkey.v.image,
                }}
                style={{
                  width: 170,
                  height: 150,
                  resizeMode: 'contain',
                  position: 'absolute',
                  top: -40,
                  left: 150,
                }}
              />
            )}
          </View>
        </View>
        <Text
          style={{
            color: 'black',
            fontSize: 20,
            fontWeight: 'bold',
            alignSelf: 'center',
            marginTop: 50,
          }}>
          Prescription
        </Text>

        {/* this is the modal for medicines */}
        <Modal visible={visible}>
          <Text
            style={{
              color: 'black',
              alignSelf: 'center',
              fontSize: 20,
              marginTop: 10,
            }}>
            Choose Medicine
          </Text>
          <View style={{width: '100%', flexDirection: 'row', marginLeft: 20}}>
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
          </View>
          <View style={{width: '100%', flexDirection: 'row', marginLeft: 20}}>
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
          </View>

          <View
            style={{
              position: 'absolute',
              bottom: 10,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                width: 100,
              }}
              onPress={() => {
                setvisible(false);
              }}>
              <Text style={{color: 'black'}}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                width: 100,
              }}
              onPress={() => {
                settingmeds();
                setvisible(false);
              }}>
              <Text style={{color: 'black'}}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        {/* this is the modal for duration */}
        <Modal visible={visible1}>
          <Text
            style={{
              color: 'black',
              alignSelf: 'center',
              fontSize: 20,
              marginTop: 10,
            }}>
            Choose Duration
          </Text>
          <View style={{marginLeft: 20}}>
            <View style={{width: '100%', flexDirection: 'row'}}>
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
            </View>
            <View style={{width: '100%', flexDirection: 'row'}}>
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
            </View>
          </View>

          <View
            style={{
              position: 'absolute',
              bottom: 10,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                width: 100,
              }}
              onPress={() => {
                setvisible1(false);
              }}>
              <Text style={{color: 'black'}}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                width: 100,
              }}
              onPress={() => {
                settingduration();
                setvisible1(false);
              }}>
              <Text style={{color: 'black'}}>OK</Text>
            </TouchableOpacity>
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
            justifyContent: 'space-evenly',
            marginTop: 10,
          }}>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              height: 35,
              width: 80,
            }}
            onPress={() => {
              setvisible(true);
            }}>
            <Text style={{color: 'black'}}>Medicine</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              height: 35,
              width: 80,
            }}
            onPress={() => {
              setvisible1(true);
            }}>
            <Text style={{color: 'black'}}>Duration</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              height: 35,
              width: 80,
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
            height: 35,
            borderWidth: 1,
            width: 150,
            alignSelf: 'center',
            marginTop: 10,
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

        <View
          style={{
            marginTop: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FlatList
            data={prescription}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    height: 30,
                    borderWidth: 1,

                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    marginTop: 2,
                  }}>
                  <Text style={{color: 'black', fontSize: 15}}>
                    {item.medicine_name}
                  </Text>
                  <Text style={{color: 'black', fontSize: 15}}>
                    {item.duration}
                  </Text>
                  <Text style={{color: 'black', fontSize: 15}}>
                    {item.timings}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setprescription(
                        prescription.filter(
                          x => x.medicine_name !== item.medicine_name,
                        ),
                      );
                    }}>
                    <Text style={{color: 'red'}}>Remove</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
          {prescription.length == 0 ? null : (
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 35,
                borderWidth: 1,
                width: 150,
                alignSelf: 'center',
                marginTop: 5,
                borderRadius: 10,
                marginBottom: 5,
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
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default Patientdetails;
