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
import React, {useState, useEffect} from 'react';
import {RadioButton} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import {useSelector} from 'react-redux';

const Addpatient = ({route, navigation}) => {
  const [cnic, setcnic] = useState('');
  const [newcnic, setnewcnic] = useState('');
  const [fullname, setfullname] = useState('');
  const [relation, setrelation] = useState('self');
  const [relativename, setrelativename] = useState('');
  const [dob, setdob] = useState('');
  const [gender, setgender] = useState('');
  const [patid, setpatid] = useState();
  const [updatecnicfiled, setupdatecnicfiled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  //this will upate the patients cnic and other details
  const updatepatientdetails = async () => {
    fetch(
      `http://${global.MyVar}/fyp/api/Patient/Updatepatdetails?patient_id=${patid}&newcnic=${newcnic}`,
      {
        method: 'POST',
        body: JSON.stringify({
          cnic: cnic,
          full_name: fullname,
          relation: relation,
          relative_name: relativename,
          dob: dob,
          gender: gender,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    )
      .then(response => response.json())
      .then(json => alert(json));
  };

  //this method will check the cnic of the patient in database if its exist or not if cnic exist it will populate the fields
  const checkcnic = val => {
    fetch(`http://${global.MyVar}/fyp/api/Patient/Checkingcnic?cnic=${val}`)
      .then(response => response.json())
      .then(json => {
        console.log(json, 'this is searched cnic data');
        setfullname(json.full_name);
        setrelation(json.relation);
        setdob(json.dob);
        setrelativename(json.relative_name);
        setgender(json.gender);
        setpatid(json.patient_id);
      })
      .catch(error => {
        console.error(error);
      });
  };

  //it will add the patient personal details to db after saving it will return the id and store it to patid state
  const addpat = async () => {
    // if (
    //   cnic.length !== 13 ||
    //   fullname == undefined ||
    //   dob == undefined ||
    //   gender == undefined
    // ) {
    //   alert('Enter All The Information');
    // } else {
    fetch(`http://${global.MyVar}/fyp/api/Patient/Addpat`, {
      method: 'POST',
      body: JSON.stringify({
        cnic: cnic,
        full_name: fullname,
        relation: relation,
        relative_name: relativename,
        dob: dob,
        gender: gender,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(json => {
        setpatid(json);
        Alert.alert('New Patient Added Successfully');
      });
    // }
  };

  console.log(patid, 'Patient Id');

  return (
    <ScrollView>
      <View style={{flex: 1}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            height: 45,
          }}>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 23,
              color: 'black',
            }}>
            Add New Patient
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TextInput
            style={{
              width: '85%',
              borderWidth: 1,
              borderRadius: 15,
              paddingLeft: 15,
              marginTop: 10,
              height: 45,
            }}
            placeholder="Enter Cnic"
            placeholderTextColor={'black'}
            value={cnic}
            onChangeText={val => {
              setcnic(val);
              checkcnic(val);
            }}
            maxLength={13}
            keyboardType="number-pad"
          />
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'flex-end',
              borderRadius: 10,
              borderWidth: 1,
              marginRight: 35,
              marginTop: 10,
              height: 30,
              width: 100,
            }}
            onPress={() => setupdatecnicfiled(true)}>
            <Text style={{color: 'black'}}>Update Cnic</Text>
          </TouchableOpacity>
          {updatecnicfiled !== false ? (
            <TextInput
              style={{
                width: '85%',
                borderWidth: 1,
                borderRadius: 15,
                paddingLeft: 15,
                marginTop: 10,
                height: 45,
              }}
              placeholder="Enter Updated Cnic"
              placeholderTextColor={'black'}
              value={newcnic}
              onChangeText={txt => setnewcnic(txt)}
            />
          ) : null}
          <TextInput
            style={{
              width: '85%',
              borderWidth: 1,
              borderRadius: 15,
              paddingLeft: 15,
              marginTop: 10,
              height: 45,
            }}
            placeholder="Enter Full Name"
            placeholderTextColor={'black'}
            value={fullname}
            onChangeText={value => setfullname(value)}
          />
          <Picker
            style={{
              backgroundColor: 'white',
              width: '85%',
              marginTop: 10,
            }}
            selectedValue={relation}
            onValueChange={value => {
              setrelation(value);
            }}>
            <Picker.Item label="Choose Relation" />
            <Picker.Item label="Self" value="self" />
            <Picker.Item label="Wife/Spouse" value="wife" />
            <Picker.Item label="Child" value="child" />
            <Picker.Item label="Other Relatives" value="other_relatives" />
          </Picker>
          {relation !== 'self' ? (
            <TextInput
              style={{
                width: '85%',
                borderWidth: 1,
                borderRadius: 15,
                paddingLeft: 15,
                marginTop: 10,
                height: 45,
              }}
              placeholder="Enter Relative Name"
              placeholderTextColor={'black'}
              value={relativename}
              onChangeText={value => setrelativename(value)}
            />
          ) : null}
          <TextInput
            style={{
              width: '85%',
              borderWidth: 1,
              borderRadius: 15,
              paddingLeft: 15,
              marginTop: 10,
              height: 45,
            }}
            placeholder="DD-MM-YYYY"
            placeholderTextColor={'black'}
            value={dob}
            onChangeText={value => setdob(value)}
          />
        </View>

        <View
          style={{
            borderWidth: 1,
            width: '85%',
            alignSelf: 'center',
            marginTop: 10,
            borderRadius: 15,
          }}>
          <Text
            style={{
              fontSize: 20,
              color: 'black',
              fontWeight: '600',
              marginLeft: 10,
              marginTop: 10,
            }}>
            Select Gender
          </Text>
          <RadioButton.Group
            onValueChange={value => setgender(value)}
            value={gender}>
            <RadioButton.Item label="Male" value="Male" />
            <RadioButton.Item label="Female" value="Female" />
          </RadioButton.Group>
        </View>
        <View
          style={{
            marginTop: 10,
            alignSelf: 'center',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 15,
              height: 35,
              width: '70%',
              borderWidth: 1,
            }}
            onPress={addpat}>
            <Text style={{color: 'black'}}>Save Patient</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 15,
              height: 35,
              width: '70%',
              borderWidth: 1,
              marginTop: 10,
            }}
            onPress={() => {
              navigation.navigate('Addvitals', {
                patient_id: patid,
              });
            }}>
            <Text style={{color: 'black'}}>Add Vitals</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 15,
              height: 35,
              width: '70%',
              borderWidth: 1,
              marginTop: 10,
            }}
            onPress={updatepatientdetails}>
            <Text style={{color: 'black'}}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Addpatient;
