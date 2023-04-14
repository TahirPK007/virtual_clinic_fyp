import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TextInput, RadioButton, Button} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import CheckBox from '@react-native-community/checkbox';

const Addvitals = ({route, navigation}) => {
  const {patient_id} = route.params;
  console.log(patient_id, 'on the addvitals page');

  const [bp, setbp] = useState('');
  const [sugar, setsugar] = useState('');
  const [temperature, settemperature] = useState('');
  const [imageData, setImageData] = useState();
  const [filePath, setFilePath] = useState({});
  const [status, setstatus] = useState(0);

  let symptoms = [];

  //adding all the symptoms
  const [cough, setcough] = useState(false);
  if (cough === true) {
    symptoms.push('Cough');
  }
  const [legpain, setlegpain] = useState(false);
  if (legpain === true) {
    symptoms.push('Leg Pain');
  }
  const [backpain, setbackpain] = useState(false);
  if (backpain === true) {
    symptoms.push('Back Pain');
  }
  const [headache, setheadache] = useState(false);
  if (headache === true) {
    symptoms.push('Headache');
  }
  const [stomachpain, setstomachpain] = useState(false);
  if (stomachpain === true) {
    symptoms.push('Stomach Pain');
  }
  const [throatpain, setthroatpain] = useState(false);
  if (throatpain === true) {
    symptoms.push('Throat Pain');
  }

  //this function is populating vitals and visits table
  const vits = patient_id => {
    addvits();
    visit(patient_id);
    alert('Vitals And New Visit Added');
  };

  const visit = async () => {
    fetch(
      `http://${global.MyVar}/fyp/api/Patient/Visits?patient_id=${patient_id}&status=${status}`,
      {
        method: 'POST',
        // body: JSON.stringify({
        //   // patient_id: `${patient_id}`,
        // }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    )
      .then(response => response.json())
      .then(json => console.log(json));
  };

  const addvits = async () => {
    let data = new FormData();
    if (filePath === '') {
      data.append('blood_pressure', bp);
      data.append('sugar', sugar);
      data.append('temperature', temperature);
      data.append('symptoms', symptoms);
      data.append('image', null);
      data.append('patient_id', patient_id);
    } else {
      data.append('blood_pressure', bp);
      data.append('sugar', sugar);
      data.append('temperature', temperature);
      data.append('symptoms', symptoms);
      data.append('image', imageData);
      data.append('patient_id', patient_id);
    }

    let response = await fetch(
      `http://${global.MyVar}/fyp/api/Nursel/Addvitals`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      },
    );
    let json = await response.json();
    console.log(json);
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else {
      return true;
    }
  };

  const captureImage = async type => {
    console.log('Capture Image ');
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
      includeBase64: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        setImageData({
          uri: response.assets[0].uri,
          name: response.assets[0].fileName,
          type: response.assets[0].type,
        });
        setFilePath(response.assets[0]);
      });
    }
  };

  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      setImageData({
        uri: response.assets[0].uri,
        name: response.assets[0].fileName,
        type: response.assets[0].type,
      });
      setFilePath(response.assets[0]);
    });
  };

  return (
    <ScrollView>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
            Add Vitals
          </Text>
        </View>
        <View style={{width: responsiveWidth(85)}}>
          <Text style={{color: 'red', fontSize: responsiveFontSize(2)}}>
            Blood Pressure
          </Text>
          <TextInput
            style={{height: 40, backgroundColor: 'white'}}
            // label="Cnic"
            mode="outlined"
            value={bp}
            onChangeText={text => setbp(text)}
          />
        </View>
        <View style={{width: responsiveWidth(85)}}>
          <Text style={{color: 'red', fontSize: responsiveFontSize(2)}}>
            Sugar
          </Text>
          <TextInput
            style={{height: 40, backgroundColor: 'white'}}
            // label="Cnic"
            mode="outlined"
            value={sugar}
            onChangeText={text => setsugar(text)}
          />
        </View>
        <View style={{width: responsiveWidth(85)}}>
          <Text style={{color: 'red', fontSize: responsiveFontSize(2)}}>
            Temperature
          </Text>
          <TextInput
            style={{height: 40, backgroundColor: 'white'}}
            // label="Cnic"
            mode="outlined"
            value={temperature}
            onChangeText={text => settemperature(text)}
          />
        </View>
        <View style={{width: responsiveWidth(85)}}>
          <Text style={{color: 'red', fontSize: responsiveFontSize(2)}}>
            Choose Symptoms
          </Text>
          <View
            style={{
              justifyContent: 'space-between',
              marginTop: 5,
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
              <CheckBox
                value={cough}
                onValueChange={value => {
                  setcough(value);
                }}
              />
              <Text>Cough</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CheckBox
                value={legpain}
                onValueChange={value => {
                  setlegpain(value);
                }}
              />
              <Text>Leg Pain</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CheckBox
                value={backpain}
                onValueChange={value => {
                  setbackpain(value);
                }}
              />
              <Text>Back Pain</Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              marginTop: 5,
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
              <CheckBox
                value={headache}
                onValueChange={value => {
                  setheadache(value);
                }}
              />
              <Text>Headache</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CheckBox
                value={stomachpain}
                onValueChange={value => {
                  setstomachpain(value);
                }}
              />
              <Text>Stomach Pain</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CheckBox
                value={throatpain}
                onValueChange={value => {
                  setthroatpain(value);
                }}
              />
              <Text>Throat Pain</Text>
            </View>
          </View>
        </View>
        {filePath.uri === null ? (
          null()
        ) : (
          <View
            style={{
              width: responsiveWidth(85),
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 5,
            }}>
            <Image
              style={{height: 100, width: 100, resizeMode: 'center'}}
              source={{uri: filePath.uri}}
            />
          </View>
        )}

        <View
          style={{
            width: responsiveWidth(85),
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
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
            onPress={() => chooseFile('photo')}>
            <Text style={{color: 'white'}}>Choose Image</Text>
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
            onPress={vits}>
            <Text style={{color: 'white'}}>Submit</Text>
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
            onPress={() => captureImage('photo')}>
            <Text style={{color: 'white'}}>Capture Image</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Addvitals;
