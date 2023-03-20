import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Reac, {useState, useEffect} from 'react';
import {RadioButton, Button, Modal} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';

const Addpatient = ({route, navigation}) => {
  const [cnic, setcnic] = useState();
  const [newcnic, setnewcnic] = useState();
  const [fullname, setfullname] = useState('');
  const [relation, setrelation] = useState('self');
  const [relativename, setrelativename] = useState('');
  const [dob, setdob] = useState();
  const [gender, setgender] = useState('');
  const [patid, setpatid] = useState();
  const [updatecnicfiled, setupdatecnicfiled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const updatepatientdetails = async () => {
    fetch(
      `http://${global.MyVar}/fyp/api/Patient/Updatepatdetails?patient_id=${patid}&newcnic=${newcnic}`,
      {
        method: 'POST',
        body: JSON.stringify({
          cnic: `${cnic}`,
          full_name: `${fullname}`,
          relation: `${relation}`,
          relative_name: `${relativename}`,
          dob: `${dob}`,
          gender: `${gender}`,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    )
      .then(response => response.json())
      .then(json => console.log(json));
  };

  //this method will check the cnic of the patient in database if its exist or not if cnic exist it will populate the fields
  const checkcnic = cnic => {
    setcnic(cnic);
    fetch(`http://${global.MyVar}/fyp/api/Patient/Checkcnic?cnic=${cnic}`, {
      method: 'POST',
      body: JSON.stringify({
        cnic: `${cnic}`,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(json => {
        setfullname(json.full_name);
        setrelation(json.relation);
        setrelativename(json.relative_name);
        setdob(json.dob);
        setgender(json.gender);
        setpatid(json.patient_id);
      });
  };

  //it will add the patient personal details to db after saving it will return the id and store it to patid state
  const addpat = async () => {
    fetch(`http://${global.MyVar}/fyp/api/Patient/Addpat`, {
      method: 'POST',
      body: JSON.stringify({
        cnic: `${cnic}`,
        full_name: `${fullname}`,
        relation: `${relation}`,
        relative_name: `${relativename}`,
        dob: `${dob}`,
        gender: `${gender}`,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(json => {
        setpatid(json);
      });
  };

  console.log(patid, 'Patient Id');

  return (
    <>
      <ScrollView>
        <View style={{felx: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: responsiveHeight(1.5),
              backgroundColor: 'white',
              elevation: 1,
              borderRadius: 10,
              height: 40,
              width: '70%',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: responsiveFontSize(2.5),
                color: 'black',
              }}>
              Add New Patient
            </Text>
          </View>
          <View style={{width: responsiveWidth(85)}}>
            <Text style={{color: 'red', fontSize: responsiveFontSize(2)}}>
              Cnic
            </Text>
            <TextInput
              style={{height: 40, backgroundColor: 'white'}}
              // label="Cnic"
              mode="outlined"
              value={cnic}
              onChangeText={checkcnic}
            />
          </View>
          {/* <View style={{width: responsiveWidth(85)}}>
            <Text style={{color: 'red', fontSize: responsiveFontSize(2.5),fontWeight:"700"}}>
              New Cnic
            </Text>
            <TextInput
              style={{
                height: 50,
                backgroundColor: 'white',
                // borderRadius: 30,
                padding: 15,
                // borderBottomColor: 'black',
                // borderWidth:1,
                borderBottomWidth: 2,
                borderBottomColor: 'black',
                marginTop:5
              }}
              // placeholder="Enter Cnic"
            />
          </View> */}
          <View
            style={{
              alignItems: 'flex-end',
              marginTop: responsiveHeight(1),
              width: responsiveWidth(85),
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: 'green',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                height: 35,
                width: 100,
              }}
              onPress={() => setupdatecnicfiled(true)}>
              <Text style={{color: 'white'}}>Update Cnic</Text>
            </TouchableOpacity>
          </View>
          {updatecnicfiled !== false ? (
            <View
              style={{
                width: responsiveWidth(85),
                marginBottom: responsiveHeight(2),
              }}>
              <Text style={{color: 'red', fontSize: responsiveFontSize(2)}}>
                Update Cnic
              </Text>
              <TextInput
                style={{height: 40, backgroundColor: 'white'}}
                mode="outlined"
                // label="Full Name"
                value={newcnic}
                onChangeText={text => setnewcnic(text)}
              />
            </View>
          ) : null}
          <View style={{width: responsiveWidth(85)}}>
            <Text style={{color: 'red', fontSize: responsiveFontSize(2)}}>
              Full Name
            </Text>
            <TextInput
              style={{height: 40, backgroundColor: 'white'}}
              // label="Cnic"
              mode="outlined"
              value={fullname}
              onChangeText={value => {
                setfullname(value);
              }}
            />
          </View>
          <View
            style={{
              width: responsiveWidth(85),
              marginTop: responsiveHeight(3),
            }}>
            <Text style={{color: 'red', fontSize: responsiveFontSize(2)}}>
              Relation
            </Text>
            <Picker
              style={{backgroundColor: 'white', height: 40}}
              selectedValue={relation}
              onValueChange={value => {
                setrelation(value);
              }}>
              <Picker.Item label="Self" value="self" />
              <Picker.Item label="Wife/Spouse" value="wife" />
              <Picker.Item label="Child" value="child" />
              <Picker.Item label="Other Relatives" value="other_relatives" />
            </Picker>
          </View>
          {relation !== 'self' ? (
            <View
              style={{
                width: responsiveWidth(85),
                marginTop: responsiveHeight(2),
              }}>
              <Text style={{color: 'red', fontSize: responsiveFontSize(2)}}>
                Relative Name
              </Text>
              <TextInput
                style={{height: 40, backgroundColor: 'white'}}
                // label="Cnic"
                mode="outlined"
                value={relativename}
                onChangeText={value => {
                  setrelativename(value);
                }}
              />
            </View>
          ) : null}
          <View
            style={{
              width: responsiveWidth(85),
              marginTop: responsiveHeight(2),
            }}>
            <Text style={{color: 'red', fontSize: responsiveFontSize(2)}}>
              Date Of Birth
            </Text>
            <TextInput
              style={{height: 40, backgroundColor: 'white'}}
              // label="Cnic"
              mode="outlined"
              value={dob}
              onChangeText={value => {
                setdob(value);
              }}
            />
          </View>

          <View
            style={{
              // justifyContent: 'center',
              // alignItems: 'center',
              width: responsiveWidth(85),
              flexDirection: 'column',
              marginTop: responsiveHeight(2),
            }}>
            <RadioButton.Group
              onValueChange={value => setgender(value)}
              value={gender}>
              <Text style={{fontSize: responsiveFontSize(2), color: 'red'}}>
                Gender :
              </Text>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <RadioButton.Item
                  label="Male"
                  value="male"
                  style={{width: responsiveWidth(30)}}
                />
                <RadioButton.Item
                  label="Female"
                  value="female"
                  style={{width: responsiveWidth(34)}}
                />
              </View>
            </RadioButton.Group>
          </View>
          <View
            style={{
              width: responsiveWidth(85),
              marginTop: responsiveHeight(2),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: 'green',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                height: 35,
                width: 100,
              }}
              onPress={addpat}>
              <Text style={{color: 'white'}}>Save Patient</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: 'green',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                height: 35,
                width: 100,
              }}
              onPress={() => {
                navigation.navigate('Addvitals', {
                  patient_id: patid,
                });
              }}>
              <Text style={{color: 'white'}}>Add Vitals</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: 'green',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                height: 35,
                width: 100,
              }}
              onPress={updatepatientdetails}>
              <Text style={{color: 'white'}}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Addpatient;
