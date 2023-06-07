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
  Button,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/native';

const Patientdetails = ({route}) => {
  const navigation = useNavigation();
  const [patid, setpatid] = useState(route.params.paramkey.p.patient_id);
  const [vital_id, setvital_id] = useState(route.params.paramkey.v.vital_id);
  const [jrdocid, setjrdocid] = useState(route.params.paramkey.x.jrdoc_id);
  // console.log(jrdocid, 'this is JRDOCCCCCCCCCCCCCCCCCCCC id');
  const [appointmentid, setappointmentid] = useState();
  //other meds status
  const [othermed, setothermed] = useState(false);
  //other duration
  const [otherdur, setotherdur] = useState(false);
  //other timings
  const [othertime, setothertime] = useState(false);

  //main prescription array
  const [prescription, setprescription] = useState([]);
  // console.log(prescription, 'array to send');

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

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = today.getDate();

  // Format the date as desired (e.g., M/D/YYYY)
  let formattedDay = day.toString();
  if (formattedDay.length === 2 && formattedDay.startsWith('0')) {
    formattedDay = formattedDay.slice(1);
  }

  const formattedDate = `${month.toString()}/${formattedDay}/${year}`;
  // console.log(formattedDate, 'this is date');

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
      // console.log(error);
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
        // console.log(json);
      });
  };

  //upadting current patients's vitals status to prevent it from refetching
  const updatingvitalstatus = async () => {
    await fetch(
      `http://${global.MyVar}/fyp/api/Jrdoc/Updatingvitalstatus?vitalid=${vital_id}&aptid=${appointmentid}`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    )
      .then(response => response.json())
      .then(json => {
        // console.log(json);
      });
  };

  //jrdoc recommending test and giving comments
  const [commentstest, setcommentstest] = useState(null);
  const givingcommentstest = async () => {
    await fetch(
      `http://${global.MyVar}/fyp/api/Jrdoc/CommentsTest?aptid=${appointmentid}&comments=${commentstest}`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    )
      .then(response => response.json())
      .then(json => {
        // console.log(json);
      });
  };

  //jrdoc adding patient to follow up
  const addingfollowup = async () => {
    await fetch(
      `http://${global.MyVar}/fyp/api/Jrdoc/AddFollowUp?patid=${patid}&jrdocid=${jrdocid}`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    )
      .then(response => response.json())
      .then(json => {
        alert(json);
      });
  };
  //removing patient from follow up
  const removefollowup = async () => {
    await fetch(
      `http://${global.MyVar}/fyp/api/Jrdoc/RemoveFollowUp?patid=${patid}`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    )
      .then(response => response.json())
      .then(json => {
        alert(json);
      });
  };

  return (
    <ScrollView>
      <View style={{flex: 1}}>
        <View
          style={{
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'black', fontSize: 25, fontWeight: '600'}}>
            Patient Details
          </Text>
        </View>
        <View
          style={{
            width: 200,
            marginLeft: 300,
            marginTop: 10,
          }}>
          {route.params.paramkey.p.jrdoc_id === null ? (
            <View>
              <Text style={{color: 'black'}}>Add Patient To Follow Up</Text>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  height: 30,
                  width: 80,
                  backgroundColor: 'orange',
                }}
                onPress={() => {
                  addingfollowup();
                }}>
                <Text style={{color: 'black'}}>Follow Up</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <Text style={{color: 'black'}}>This is Followed Up Patient</Text>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  height: 30,
                  width: 80,
                  marginTop: 5,
                  backgroundColor: 'orange',
                }}
                onPress={() => {
                  removefollowup();
                }}>
                <Text style={{color: 'black'}}>UnFollow</Text>
              </TouchableOpacity>
            </View>
          )}
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
                {`Systolic ${route.params.paramkey.v.systolic} | Diastolic ${route.params.paramkey.v.diastolic}`}
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
            <Text style={{marginLeft: 20, color: 'black', fontWeight: '600'}}>
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
          {route.params.paramkey.v.testimage == null ? null : (
            <View style={{marginTop: 50, width: '100%'}}>
              <Text
                style={{
                  color: 'purple',
                  fontWeight: '600',
                  fontSize: 18,
                }}>
                Test Image:
              </Text>

              <Image
                source={{
                  uri: route.params.paramkey.v.testimage,
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
            </View>
          )}

          <View style={{width: '100%', marginTop: 20}}>
            <Text
              style={{
                color: 'black',
                marginTop: 35,
                fontSize: 20,
                fontWeight: '600',
              }}>
              Comments/Test Recommendation:
            </Text>
            <TextInput
              style={{
                width: 400,
                borderWidth: 1,
                borderRadius: 15,
                height: 70,
                marginLeft: 10,
                paddingLeft: 10,
              }}
              value={commentstest}
              onChangeText={txt => setcommentstest(txt)}
              multiline={true}
            />
          </View>
        </View>
        <Text
          style={{
            color: 'black',
            fontSize: 20,
            fontWeight: 'bold',
            alignSelf: 'center',
            marginTop: 10,
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
          <TouchableOpacity
            style={{
              width: '80%',
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              alignSelf: 'center',
              marginTop: 10,
            }}
            onPress={() => {
              setothermed(true);
            }}>
            <Text>Other?</Text>
          </TouchableOpacity>
          {othermed === true ? (
            <TextInput
              style={{
                width: '80%',
                borderWidth: 1,
                alignSelf: 'center',
                marginTop: 10,
                paddingLeft: 10,
              }}
              placeholder="Enter Other Medicine Name"
              value={medicine}
              onChangeText={txt => setmedicine(txt)}
            />
          ) : null}

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
          <TouchableOpacity
            style={{
              width: '80%',
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              alignSelf: 'center',
              marginTop: 10,
            }}
            onPress={() => {
              setotherdur(true);
            }}>
            <Text>Other?</Text>
          </TouchableOpacity>
          {otherdur === true ? (
            <TextInput
              style={{
                width: '80%',
                borderWidth: 1,
                alignSelf: 'center',
                marginTop: 10,
                paddingLeft: 10,
              }}
              placeholder="Enter Other Medicine Name"
              value={duartion}
              onChangeText={txt => setduartion(txt)}
            />
          ) : null}

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
            <TouchableOpacity
              style={{
                width: '80%',
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                alignSelf: 'center',
                marginTop: 10,
              }}
              onPress={() => {
                setothertime(true);
              }}>
              <Text>Other?</Text>
            </TouchableOpacity>
            {othertime === true ? (
              <TextInput
                style={{
                  width: '80%',
                  borderWidth: 1,
                  alignSelf: 'center',
                  marginTop: 10,
                  paddingLeft: 10,
                }}
                placeholder="Enter Other timings"
                value={timings}
                onChangeText={txt => settimings(txt)}
              />
            ) : null}
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
            if (medicine === 'Panadol') {
              // Paracetamol should not be taken at night
              console.log(
                'Contradiction: Paracetamol should not be taken at night',
              );
            }
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
                givingcommentstest();
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
