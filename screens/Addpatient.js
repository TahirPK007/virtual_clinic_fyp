import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Reac, {useState, useEffect} from 'react';
import {TextInput, RadioButton, Button, Modal} from 'react-native-paper';
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
        <View style={{felx: 1}}>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 25, marginTop: 20,color:"black"}}>
              Add New Patient
            </Text>
          </View>
          <View>
            <Text style={{color: 'red', fontSize: 20}}>Cnic</Text>
            <TextInput
              // label="Cnic"
              value={cnic}
              onChangeText={checkcnic}
            />
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <TouchableOpacity onPress={() => setupdatecnicfiled(true)}>
              <Text style={{color: 'red'}}>Update Cnic</Text>
            </TouchableOpacity>
          </View>
          {updatecnicfiled !== false ? (
            <View>
              <Text style={{color: 'red', fontSize: 20}}>Update Cnic here</Text>
              <TextInput
                // label="Full Name"
                value={newcnic}
                onChangeText={text => setnewcnic(text)}
              />
            </View>
          ) : null}
          <View>
            <Text style={{color: 'red', fontSize: 20}}>Full Name</Text>
            <TextInput
              // label="Full Name"
              value={fullname}
              onChangeText={text => setfullname(text)}
            />
          </View>
          <View>
            <Text style={{color: 'red', fontSize: 20}}>Relation</Text>
            <Picker
              style={{backgroundColor: 'white'}}
              selectedValue={relation}
              onValueChange={value => {
                setrelation(value);
              }}>
              <Picker.Item label="self" value="self" />
              <Picker.Item label="wife" value="wife" />
              <Picker.Item label="child" value="child" />
            </Picker>
          </View>
          {relation !== 'self' ? (
            <View>
              <Text style={{color: 'red', fontSize: 20}}>Relative Name</Text>
              <TextInput
                // label="Enter relative name"
                value={relativename}
                onChangeText={text => setrelativename(text)}
              />
            </View>
          ) : null}
          <View>
            <Text style={{color: 'red', fontSize: 20}}>D.O.B</Text>
            <TextInput
              // label="Full Name"
              value={dob}
              onChangeText={text => setdob(text)}
            />
          </View>

          <View
            style={{
              // justifyContent: 'center',
              // alignItems: 'center',
              width: '100%',
              flexDirection: 'column',
            }}>
            <RadioButton.Group
              onValueChange={value => setgender(value)}
              value={gender}>
              <Text style={{fontSize: 20, marginLeft: 40, color: 'red'}}>
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
                  style={{width: 110}}
                />
                <RadioButton.Item
                  label="Female"
                  value="female"
                  style={{width: 120}}
                />
              </View>
            </RadioButton.Group>
          </View>
          <View
            style={{
              width: '80%',
              flexDirection: 'row',
              marginTop: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Button
              // icon="camera"
              mode="outlined"
              onPress={addpat}>
              Save Patient
            </Button>
            <Button
              // icon="camera"
              mode="outlined"
              onPress={() => {
                navigation.navigate('Addvitals', {
                  patient_id: patid,
                });
              }}>
              Continue To Vitals
            </Button>
            <Button
              // icon="camera"
              mode="outlined"
              onPress={updatepatientdetails}>
              Update
            </Button>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Addpatient;
