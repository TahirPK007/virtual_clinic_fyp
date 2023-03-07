import {View, Text, Image, ImageBackground} from 'react-native';
import React from 'react';

const Splash = () => {
  return (
    <View style={{flex: 1,backgroundColor:"light-green"}}>
      <Image style={{height:"100%",width:"100%",resizeMode:'center'}} source={require('../images/splash.jpg')} />
    </View>
  );
};

export default Splash;
