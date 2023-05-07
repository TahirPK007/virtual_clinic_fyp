import {View, Text, Image, ImageBackground, Dimensions} from 'react-native';
import React from 'react';

const Splash = () => {
  const {height, width} = Dimensions.get('screen');

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'light-green',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        style={{height: 100, width: 100}}
        source={require('../images/pharmacy.png')}
      />
    </View>
  );
};

export default Splash;
