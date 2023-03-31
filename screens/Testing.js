import {View, Text, FlatList, Image} from 'react-native';
import React, {useState, useEffect} from 'react';

const Testing = () => {
  useEffect(() => {
    showingpat();
  }, []);

  const [data, setdata] = useState([]);

  const showingpat = async () => {
    try {
      const response = await fetch(
        `http://${global.MyVar}/fyp/api/Nursel/Fetchvits`,
      );
      const mydata = await response.json();
      setdata(mydata);
      console.log(mydata, 'this is api response');
    } catch (error) {
      console.log(error);
    }
  };
  const imageUrl =
    'C:/Users/vscode/Desktop/fyp-c-api-for-fyp-/fyp/Content/Uploads/1.jpg';
  return (
    <View style={{flex: 1}}>
      <Text>Testing</Text>
      <FlatList
        data={data}
        renderItem={({item, index}) => {
          return (
            <View style={{flex: 1}}>
              <Text>{item.blood_pressure}</Text>
              <Text>{item.symptoms}</Text>
              <Image
                style={{width: 200, height: 200}}
                source={{uri: item.image}}
              />
              {/* <Image
                style={{width: 200, height: 200}}
                source={{
                  uri: `http://192.168.0.105/fyp/Content/Uploads/ali.png`,
                }}
              /> */}
            </View>
          );
        }}
      />
    </View>
  );
};

export default Testing;
