import React from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default class Modal extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <View style={{position: 'absolute', width: width, height: height, left: 0, top: 0, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity style={{position: 'absolute', backgroundColor: 'rgba(0,0,0,0.2)', width: width, height: height, left: 0, top: 0}}/>
        <View style={{backgroundColor: '#fff', padding: 20}}>
          {children}
        </View>
      </View>
    );
  }
}

