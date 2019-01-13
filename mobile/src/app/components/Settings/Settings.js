import React from 'react';
import { Text, View, Dimensions, TextInput, Keyboard } from 'react-native';
import { Balance } from '../Balance';
import { Button } from '../Button';
import { storage, log, format } from '../../services';
import { Modal } from '../Modal';

const { width, height } = Dimensions.get('window');

export default class Settings extends React.Component {
  state = {
    settingsCurrency: 'USD',
    isShowRemoveModal: false,
    balance: 0,
  };

  static navigationOptions = ({navigation}) => {
    if (!navigation.state.params) {
      return;
    }

    return {
      headerRight: <Balance
        balance={navigation.state.params.balance || 0}
        currency={navigation.state.params.currency || 'USD'}
      />
    };
  };

  componentDidMount() {
    log('Settings', 'componentDidMount');
    this.getDb();

    this.props.navigation.didFocus = () => {
      log('Settings', 'didFocus');
      this.getDb();
    };

    this.didBlurSubscription = this.props.navigation.addListener('didFocus', this.navigationDidFocus);
  }

  componentWillUnmount() {
    this.didBlurSubscription.remove();
  }

  navigationDidFocus = payload => {
    log('Settings', 'didFocus', payload);
    this.getDb();
  };

  getDb() {
    log('Settings', 'getDb');
    storage.getData('db').then(db => {
      log('Settings', 'db', db);
      this.setState({
        settingsCurrency: db.settingsCurrency || 'USD',
        balance: db.balance,
      }, () => {
        this.props.navigation.setParams({balance: db.balance, currency: db.settingsCurrency});
      });
    });
  }

  setCurrency(currency) {
    log('Settings', 'setCurrency', currency);

    storage.getData('db').then(db => {
      db.settingsCurrency = currency;
      return storage.setData('db', db);
    }).then(() => {
      this.setState({
        settingsCurrency: currency,
      }, () => {
        this.getDb();
      });
    });
  }

  onRemoveAllData() {
    this.setState({isShowRemoveModal: true});
  }

  removeAllData() {
    storage.setData('db', {
      operationList: [],
      categoryList: [],
      settingsCurrency: 'USD',
      balance: 0,
    }).then(() => {
      this.setState({isShowRemoveModal: false}, () => {
        this.props.navigation.navigate('OperationList');
      });
    });
  }

  setBalanceToState(balanceText) {
    this.setState({balance: !balanceText ? 0 : parseFloat(parseFloat(balanceText).toFixed(2))});
  }

  setBalance() {
    if (!this.state.balance) {
      return;
    }

    storage.getData('db').then(db => {
      db.balance = this.state.balance;
      return storage.setData('db', db);
    }).then(() => {
      Keyboard.dismiss();
      this.getDb();
    });
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff'}}>
        <View style={{flexDirection: 'column', width: width, padding: 10, marginBottom: 20}}>
          <Text style={{fontSize: 18, marginBottom: 10}}>Balance</Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
            <TextInput
              onChangeText={(text) => this.setBalanceToState(text)}
              placeholder={'0.00'}
              value={this.state.balance.toString()}
              keyboardType={'numeric'}
              style={{width: width - 80, borderBottomColor: '#eee', borderBottomWidth: 1, fontSize: 20}}
            />
            <Button
              type={'success'}
              icon={'check'}
              width={40}
              height={40}
              onPress={() => this.setBalance()}
            />
          </View>
        </View>

        <View style={{flexDirection: 'column', width: width, padding: 10, marginBottom: 20}}>
          <Text style={{fontSize: 18, marginBottom: 10}}>Currency</Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {format.getCurrencySignList().map(currency => (
              <Button
                type={this.state.settingsCurrency === currency._id ? 'success' : 'default'}
                key={'settings-currency-' + currency._id}
                title={currency.title}
                width={40}
                height={40}
                onPress={() => this.setCurrency(currency._id)}
              />
            ))}
          </View>
        </View>

        <View style={{flexDirection: 'column', width: width, padding: 10}}>
          <Text style={{fontSize: 18, marginBottom: 10}}>Cleanup</Text>
          <Text style={{fontSize: 12, marginBottom: 10}}>DANGER! Be careful, this action will remove all your data permanently.</Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
            <Button
              type={'danger'}
              icon={'trash-2'}
              title={'Remove all'}
              width={140}
              height={40}
              onPress={() => this.onRemoveAllData()}
            />
          </View>
        </View>

        {this.state.isShowRemoveModal
          ? (
            <Modal>
              <Text style={{textAlign: 'center', marginBottom: 20}}>Remove all data?</Text>

              <View style={{flexDirection: 'row'}}>
                <Button width={80} height={40} fontSize={14} title={'Cancel'} type={'default'} onPress={() => this.setState({isShowRemoveModal: false})}/>
                <Button width={80} height={40} fontSize={14} title={'Remove'} type={'danger'} onPress={() => this.removeAllData()}/>
              </View>
            </Modal>
          )
          : null
        }
      </View>
    );
  }
}
