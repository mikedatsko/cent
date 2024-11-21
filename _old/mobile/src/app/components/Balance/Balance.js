import React from 'react';
import { Text } from 'react-native';
import { format } from '../../services';

const Balance = ({balance, currency}) => {
  const currencyPosition = format.getCurrencyPosition(currency);

  return (
    <Text style={{
      paddingRight: 10,
      color: balance === 0 ? '#333' : balance > 0 ? '#009900' : '#ff0000',
      fontSize: 20,
      fontWeight: 'bold'
    }}>
      {balance < 0 ? '-' : ''}
      {currencyPosition === 'left' ? format.getCurrencySign(currency) : ''}
      {format.getAmountShort(Math.abs(balance))}
      {currencyPosition === 'right' ? format.getCurrencySign(currency) : ''}
    </Text>
  )
};

export default Balance;
