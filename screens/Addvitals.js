import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {TextInput, RadioButton, Button} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const Addvitals = ({route, navigation}) => {
  const {patient_id} = route.params;
  console.log(patient_id, 'on the addvitals page');

  const [bp, setbp] = useState('');
  const [sugar, setsugar] = useState('');
  const [temperature, settemperature] = useState('');
  const [symptoms, setsymptoms] = useState('');
  const [imageData, setImageData] = useState();
  const [filePath, setFilePath] = useState({});

  const vits = patient_id => {
    addvits();
    visit(patient_id);
  };

  const visit = async () => {
    fetch(`http://10.0.2.2/fyp/api/Patient/Visits?patient_id=${patient_id}`, {
      method: 'POST',
      body: JSON.stringify({
        patient_id: `${patient_id}`,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(json => console.log(json));
  };

  const addvits = async () => {
    let data = new FormData();
    data.append('blood_pressure', bp);
    data.append('sugar', sugar);
    data.append('temperature', temperature);
    data.append('symptoms', symptoms);
    data.append('image', imageData);
    data.append('patient_id', patient_id);

    let response = await fetch('http://10.0.2.2/fyp/api/Nursel/Addvitals', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    });
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
    <View style={{flex: 1}}>
      <View
        style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.txt}>Add Vitals</Text>
      </View>
      <View>
        <Text style={{color: 'red', fontSize: 20}}>Blood Pressure</Text>
        <TextInput
          // label="Cnic"
          value={bp}
          onChangeText={text => setbp(text)}
        />
      </View>
      <View>
        <Text style={{color: 'red', fontSize: 20}}>Sugar</Text>
        <TextInput
          // label="Cnic"
          value={sugar}
          onChangeText={text => setsugar(text)}
        />
      </View>
      <View>
        <Text style={{color: 'red', fontSize: 20}}>Temperature</Text>
        <TextInput
          // label="Cnic"
          value={temperature}
          onChangeText={text => settemperature(text)}
        />
      </View>
      <View
        style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.txt}>Add Symptoms</Text>
      </View>
      <View>
        <Text style={{color: 'red', fontSize: 20}}>Enter Symptoms</Text>
        <TextInput
          // label="Cnic"
          value={symptoms}
          onChangeText={text => setsymptoms(text)}
        />
      </View>
      <Image source={{uri: filePath.uri}} style={styles.imageStyle} />

      <View
        style={{
          flexDirection: 'row',
          marginTop: 30,
          justifyContent: 'center',
        }}>
        <Button
          style={{marginRight: 20}}
          icon="camera"
          mode="outlined"
          onPress={vits}>
          Submit
        </Button>
        <Button
          icon="camera"
          mode="outlined"
          onPress={() => chooseFile('photo')}>
          Choose Image
        </Button>
        <Button
          icon="camera"
          mode="outlined"
          onPress={() => captureImage('photo')}>
          Capture Image
        </Button>
      </View>
    </View>
  );
};

export default Addvitals;

const styles = StyleSheet.create({
  txt: {
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 20,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 5,
    marginVertical: 10,
    width: 250,
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
});
