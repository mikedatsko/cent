import React from 'react';
import { Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { format, log } from '../../services';

const { width, height } = Dimensions.get('window');
const operationTypeList = ['income_once', 'outcome_once', 'income_regular', 'outcome_regular'];
const fontSizeByLength = {
  5: 14,
  6: 14,
  7: 14,
  8: 13,
  9: 13,
  10: 12,
  11: 11,
  12: 10,
  13: 10,
  14: 9,
  15: 8,
  16: 7,
  17: 7,
  18: 7,
};
const colorByOperationType = {
  income: '#009900',
  outcome: '#ff0000',
};
const getColorByOperationType = (type) => {
  return colorByOperationType[type] || '#333';
};
const getFontSizeByLength = len => fontSizeByLength[len] || 14;

const Operation = ({ name, value, type, currency, onPress }) => {
  const valueFormatted = format.currency(currency, value);

  return (
    <TouchableOpacity
      style={{
        flex: 0,
        width: width / 2 - 10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
      }}
      onPress={() => onPress()}
    >
      <View style={{flex: 1, height: 30, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
        <Text style={{fontSize: 11, paddingLeft: 5}}>{name}</Text>
      </View>
      <View style={{width: 80, height: 30, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
        <Text style={{fontSize: getFontSizeByLength(valueFormatted.length), paddingRight: 5, color: getColorByOperationType(type)}}>{type === 'outcome' ? '-' : ''}{valueFormatted}</Text>
      </View>
    </TouchableOpacity>
  )
};

export default Operation;
