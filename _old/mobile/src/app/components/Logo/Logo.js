import React from 'react';
import { View, Image } from 'react-native';
import LogoImage from '../../../assets/images/ios/logo@60x3.png';

const Logo = ({width = 40, marginLeft = 5}) => (
  <View>
    <Image source={LogoImage} style={{width: width, height: width, marginLeft: marginLeft}}/>
  </View>
);

export default Logo;
