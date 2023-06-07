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
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {RadioButton, Button} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import CheckBox from '@react-native-community/checkbox';
import Bottomnavigator from './Bottomnavigator';
import {useSelector} from 'react-redux';

const Addvitals = ({route, navigation}) => {
  const nursedata = useSelector(state => state.nurse);
  const {nurseID} = nursedata.data[0];
  const {patient_id} = route.params;
  console.log(patient_id, 'on the addvitals page');

  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [sugar, setsugar] = useState('');
  const [temperature, settemperature] = useState('');
  const [imageData, setImageData] = useState(null);
  const [filePath, setFilePath] = useState({});
  const [imageData2, setimageData2] = useState(null);
  const [filePath2, setfilePath2] = useState({});
  const [status, setstatus] = useState(0);

  console.log(imageData, 'this is image data');

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
    // if (
    //   systolic.length < 1 ||
    //   diastolic.length < 1 ||
    //   sugar.length < 1 ||
    //   temperature.length < 1 ||
    //   symptoms.length < 1
    // ) {
    //   alert('enter all the info');
    // } else {
    addvits();
    visit(patient_id);
    alert('Vitals And New Visit Added');
    navigation.navigate('Bottomnavigator');
    // }
  };

  const visit = async () => {
    fetch(
      `http://${global.MyVar}/fyp/api/Patient/Visits?patient_id=${patient_id}&status=${status}&nurseid=${nurseID}`,
      {
        method: 'POST',
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

    data.append('systolic', systolic);
    data.append('diastolic', diastolic);
    data.append('sugar', sugar);
    data.append('temperature', temperature);
    data.append('symptoms', symptoms);
    data.append('image', imageData);
    data.append('testimage', imageData2);
    data.append('patient_id', patient_id);

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

  const captureImage = async (type, imageIndex) => {
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
        if (imageIndex === 1) {
          setImageData({
            uri: response.assets[0].uri,
            name: response.assets[0].fileName,
            type: response.assets[0].type,
          });
          setFilePath(response.assets[0]);
        } else if (imageIndex === 2) {
          setimageData2({
            uri: response.assets[0].uri,
            name: response.assets[0].fileName,
            type: response.assets[0].type,
          });
          setfilePath2(response.assets[0]);
        }
      });
    }
  };

  const chooseFile = (type, imageIndex) => {
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
      if (imageIndex === 1) {
        setImageData({
          uri: response.assets[0].uri,
          name: response.assets[0].fileName,
          type: response.assets[0].type,
        });
        setFilePath(response.assets[0]);
      } else if (imageIndex === 2) {
        setimageData2({
          uri: response.assets[0].uri,
          name: response.assets[0].fileName,
          type: response.assets[0].type,
        });
        setfilePath2(response.assets[0]);
      }
    });
  };
  console.log(filePath.uri, 'uri');
  return (
    <ScrollView>
      <View style={{flex: 1}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            height: 50,
          }}>
          <Text
            style={{
              fontSize: 20,
              color: 'black',
              fontWeight: '600',
            }}>
            Add Patient's Vitals
          </Text>
        </View>
        <Text
          style={{
            color: 'black',
            alignSelf: 'flex-start',
            marginLeft: 20,
            marginTop: 10,
          }}>
          Blood Pressure
        </Text>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <TextInput
            style={{
              width: '40%',
              borderWidth: 1,
              borderRadius: 15,
              paddingLeft: 10,
              marginTop: 10,
              height: 35,
            }}
            placeholder="Systolic"
            placeholderTextColor={'black'}
            value={systolic}
            onChangeText={value => setSystolic(value)}
            keyboardType="number-pad"
          />
          <TextInput
            style={{
              width: '40%',
              borderWidth: 1,
              borderRadius: 15,
              paddingLeft: 15,
              marginTop: 10,
              height: 35,
            }}
            placeholder="Diastolic"
            placeholderTextColor={'black'}
            value={diastolic}
            onChangeText={value => setDiastolic(value)}
            keyboardType="number-pad"
          />
        </View>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'black',
              alignSelf: 'flex-start',
              marginLeft: 20,
              marginTop: 10,
            }}>
            Sugar
          </Text>
          <TextInput
            style={{
              width: '90%',
              borderWidth: 1,
              borderRadius: 15,
              paddingLeft: 15,
              marginTop: 10,
              height: 35,
            }}
            placeholder=""
            placeholderTextColor={'black'}
            value={sugar}
            onChangeText={value => setsugar(value)}
            keyboardType="number-pad"
          />
          <Text
            style={{
              color: 'black',
              alignSelf: 'flex-start',
              marginLeft: 20,
              marginTop: 10,
            }}>
            Temperature
          </Text>
          <TextInput
            style={{
              width: '90%',
              borderWidth: 1,
              borderRadius: 15,
              paddingLeft: 15,
              marginTop: 10,
              height: 35,
            }}
            placeholder="Temperature In Fahrenheit"
            placeholderTextColor={'black'}
            value={temperature}
            onChangeText={value => settemperature(value)}
            keyboardType="number-pad"
          />
        </View>
        <Text
          style={{
            color: 'black',
            alignSelf: 'flex-start',
            marginLeft: 20,
            marginTop: 10,
          }}>
          Choose Symptoms
        </Text>
        <View style={{width: '100%'}}>
          <View
            style={{
              width: '100%',
              justifyContent: 'space-evenly',
              marginTop: 5,
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
              }}>
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
              width: '100%',
              justifyContent: 'space-evenly',
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

        {filePath.uri === undefined ? (
          <Image
            source={require('../images/image.png')}
            style={{
              width: 200,
              height: 100,
              alignSelf: 'center',
              marginTop: 10,
              resizeMode: 'stretch',
            }}
          />
        ) : (
          <Image
            style={{
              height: 100,
              width: 200,
              alignSelf: 'center',
              marginTop: 10,
              resizeMode: 'stretch',
            }}
            source={{uri: filePath.uri}}
          />
        )}
        <View style={{width: '100%'}}>
          <Text
            style={{
              color: 'purple',
              alignSelf: 'center',
              fontWeight: '700',
              fontSize: 20,
            }}>
            Test Image
          </Text>

          {filePath2.uri === undefined ? (
            <Image
              source={require('../images/image.png')}
              style={{
                width: 200,
                height: 100,
                alignSelf: 'center',
                marginTop: 10,
                resizeMode: 'stretch',
              }}
            />
          ) : (
            <Image
              style={{
                height: 100,
                width: 200,
                alignSelf: 'center',
                marginTop: 10,
                resizeMode: 'stretch',
              }}
              source={{uri: filePath2.uri}}
            />
          )}
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
            onPress={vits}>
            <Text style={{color: 'black'}}>Submit</Text>
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
            onPress={() => chooseFile('photo', 1)}>
            <Text style={{color: 'black'}}>Choose Image</Text>
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
            onPress={() => captureImage('photo', 1)}>
            <Text style={{color: 'black'}}>Capture Image</Text>
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
            onPress={() => chooseFile('photo', 2)}>
            <Text style={{color: 'black'}}>Choose Test Image</Text>
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
            onPress={() => captureImage('photo', 2)}>
            <Text style={{color: 'black'}}>Capture Test Image</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Addvitals;
