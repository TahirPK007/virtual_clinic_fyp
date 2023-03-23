import {View, Text, Image, ImageBackground, Dimensions} from 'react-native';
import React from 'react';

const Splash = () => {
  const {height, width} = Dimensions.get('screen');

  return (
    <View style={{flex: 1, backgroundColor: 'light-green'}}>
      <Image
        style={{height: height, width: width,resizeMode:"contain"}}
        source={require('../images/splash2.png')}
      />
    </View>
  );
};

export default Splash;
