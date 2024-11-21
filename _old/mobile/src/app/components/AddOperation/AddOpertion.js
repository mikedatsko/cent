import React from 'react';
import { FlatList, Text, TextInput, View, Keyboard, Dimensions } from 'react-native';
import { Button } from '../Button';
import { format, log, storage } from '../../services';
import { Balance } from '../Balance';

const { width, height } = Dimensions.get('window');

export default class AddOperation extends React.Component {
  state = {
    isShowAddCategory: false,
    isShowAddOperation: false,
    isShowSettings: false,
    formAddValue: '0',
    formAddCategoryValue: '',
    formAddOperation: 'income',
    formAddOperationCategory: null,
    formAddError: false,
    formAddCategoryError: false,
    incomeList: [],
    outcomeList: [],
    month: new Date().getMonth(),
    year: new Date().getFullYear(),

    // DB
    categoryList: [],
    settingsCurrency: 'USD',
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
    log('AddOperation', 'componentDidMount');
    this.getDb();

    this.props.navigation.didFocus = () => {
      log('AddOperation', 'didFocus');
      this.getDb();
    };

    this.didBlurSubscription = this.props.navigation.addListener('didFocus', this.navigationDidFocus);
  }

  componentWillUnmount() {
    this.didBlurSubscription.remove();
  }

  navigationDidFocus = payload => {
    log('navigationDidFocus', payload);

    this.setState({
      formAddValue: '0'
    });
    this.getDb();
  };

  getDb() {
    storage.getData('db').then(db => {
      log('AddOperation', 'db', db);

      this.setState({
        categoryList: db.categoryList,
        settingsCurrency: db.settingsCurrency || 'USD',
        formAddOperationCategory: db.categoryList.length ? db.categoryList[0]._id : null
      });
      this.props.navigation.setParams({balance: db.balance, currency: db.settingsCurrency});
    });
  }

  addOperation() {
    log('AddOperation', 'addOperation', this.state.formAddValue);
    const { settingsCurrency } = this.state;

    if (!this.state.formAddValue) {
      this.setState({formAddError: true});
      return;
    }

    if (!this.state.formAddOperationCategory) {
      this.setState({formAddCategoryError: true});
      return;
    }

    const operationCategory = this.state.categoryList.filter(category => category._id === this.state.formAddOperationCategory)[0];

    if (!operationCategory) {
      this.setState({formAddCategoryError: true});
      return;
    }

    const operationMonth = parseInt(`${this.state.year}${this.state.month}`, 10);
    const created = new Date().getTime();
    const newOperation = {
      _id: `operation-${created}`,
      name: operationCategory.title,
      category: operationCategory._id,
      value: parseFloat(this.state.formAddValue),
      created: created,
      month: operationMonth,
      type: operationCategory.type,
      currency: settingsCurrency,
    };

    storage.getData('db').then(db => {
      log('addOperation', newOperation, db.balance);

      db.operationList = [...db.operationList, newOperation];

      if (typeof db.balance === 'undefined') {
        db.balance = 0;
      }

      db.balance = parseFloat(parseFloat(db.balance).toFixed(2));

      if (newOperation.type === 'income') {
        db.balance = db.balance + newOperation.value;
      } else if (newOperation.type === 'outcome') {
        db.balance = db.balance - newOperation.value;
      }

      storage.setData('db', db).then(() => {
        this.setState({
          formAddValue: '0',
          formAddOperationCategory: null,
          formAddError: false,
          formAddCategoryError: false,
        }, () => {
          this.props.navigation.navigate('OperationList');
        });
      });
    });
  }

  addNumber(num) {
    const formAddValueList = this.state.formAddValue.split('.');

    if (formAddValueList.length > 1 && (num === '.' || formAddValueList[1].length >= 2)) {
      return;
    }

    formAddValueList[0] = parseInt(formAddValueList[0]);

    if (formAddValueList.length > 1) {
      formAddValueList[1] += num;
    } else {
      formAddValueList[0] += num;
    }

    const formAddValue = formAddValueList.join('.');

    this.setState({formAddValue: formAddValue});
  }

  removeNumber() {
    const formAddValue = this.state.formAddValue.substr(0, this.state.formAddValue.length - 1);
    this.setState({formAddValue: !formAddValue.length ? '0' : formAddValue});
  }

  render() {
    const { settingsCurrency } = this.state;

    return (
      <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
        <View
          style={{
            flex: 0,
            flexDirection: 'row',
            padding: 20,
          }}
        >
          <Text
            style={{
              flex: 1,
              fontSize: 40,
              textAlign: 'center',
              borderBottomWidth: 1,
              borderBottomColor: '#333',
              backgroundColor: this.state.formAddError && !this.state.formAddValue ? 'rgba(255,0,0,0.2)' : null
            }}
          >
            {format.currency(settingsCurrency, parseFloat(this.state.formAddValue))}
          </Text>
        </View>

        <View
          style={{
            flex: 0,
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}
        >
          <View style={{borderWidth: 2, borderColor: this.state.formAddCategoryError ? '#f00' : 'transparent', width: width / 2}}>
            <FlatList
              style={{height: height - 250}}
              data={this.state.categoryList.map(category => ({...category, key: `category-${category._id}`}))}
              renderItem={({item}) => (
                <Button
                  title={item.title}
                  type={this.state.formAddOperationCategory === item.title ? 'default' : 'transparent'}
                  width={180}
                  height={30}
                  fontSize={14}
                  align={'flex-start'}
                  onPress={() => this.setState({formAddOperationCategory: item._id})}
                  icon={this.state.formAddOperationCategory === item._id ? 'check-circle' : 'circle'}
                  iconSize={16}
                  fontColor={item.type === 'income' ? '#009900' : '#ff0000'}
                />
              )}
            />
          </View>

          <View style={{width: width / 2, height: height - 225, borderWidth: 0, borderColor: '#333', justifyContent: 'flex-end'}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <Button title={'7'} onPress={() => this.addNumber('7')} type={'default'} width={40} height={40}/>
              <Button title={'8'} onPress={() => this.addNumber('8')} type={'default'} width={40} height={40}/>
              <Button title={'9'} onPress={() => this.addNumber('9')} type={'default'} width={40} height={40}/>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <Button title={'4'} onPress={() => this.addNumber('4')} type={'default'} width={40} height={40}/>
              <Button title={'5'} onPress={() => this.addNumber('5')} type={'default'} width={40} height={40}/>
              <Button title={'6'} onPress={() => this.addNumber('6')} type={'default'} width={40} height={40}/>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <Button title={'1'} onPress={() => this.addNumber('1')} type={'default'} width={40} height={40}/>
              <Button title={'2'} onPress={() => this.addNumber('2')} type={'default'} width={40} height={40}/>
              <Button title={'3'} onPress={() => this.addNumber('3')} type={'default'} width={40} height={40}/>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <Button title={'0'} onPress={() => this.addNumber('0')} type={'default'} width={40} height={40}/>
              <Button title={'.'} onPress={() => this.addNumber('.')} type={'default'} width={40} height={40}/>
              <Button icon={'chevron-left'} onPress={() => this.removeNumber()} type={'default'} width={40} height={40}/>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingBottom: 20}}>
              <Button
                icon={'slash'}
                onPress={() => this.props.navigation.navigate('OperationList')}
                type={'default'}
                width={62}
                height={40}
              />

              <Button
                icon={'check'}
                onPress={() => this.addOperation()}
                type={'success'}
                width={62}
                height={40}
              />
            </View>
          </View>

        </View>
      </View>
    );
  }
}
