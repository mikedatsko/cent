import React from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, FlatList, TouchableOpacity, ImageBackground, KeyboardAvoidingView } from 'react-native';
import { format, storage, log } from '../../services';
import { Button } from '../Button';
import { Operation } from '../Operation';
import { Modal } from '../Modal';
import { Balance } from '../Balance';

const { height, width } = Dimensions.get('window');

export default class OperationList extends React.Component {
  state = {
    isShowAddCategory: false,
    isShowAddOperation: false,
    isShowSettings: false,
    isShowRemoveModal: false,
    incomeList: [],
    outcomeList: [],
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    operationToRemove: null,

    // DB
    operationList: [],
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
    log('OperationList', 'componentDidMount');
    this.getDb();

    this.props.navigation.didFocus = () => {
      log('OperationList', 'didFocus');
      this.getDb();
    };

    this.didBlurSubscription = this.props.navigation.addListener('didFocus', this.navigationDidFocus);
  }

  componentWillUnmount() {
    this.didBlurSubscription.remove();
  }

  navigationDidFocus = payload => {
    log('OperationList', 'didFocus', payload);
    this.getDb();
  };

  getDb() {
    log('OperationList', 'getDb');
    storage.getData('db').then(db => {
      log('OperationList', 'db', db);
      this.setState({
        operationList: db.operationList,
        categoryList: db.categoryList,
        settingsCurrency: db.settingsCurrency || 'USD',
      }, () => {
        this.spreadOperations();
        this.props.navigation.setParams({balance: db.balance, currency: db.settingsCurrency});
      });
    });
  }

  spreadOperations() {
    this.setState({
      incomeList: this.getItemList('income'),
      outcomeList: this.getItemList('outcome'),
    });
  }

  getItemList(type) {
    const typeList = type === 'regular' ? ['income_regular', 'outcome_regular'] : [type];
    const operationMonth = parseInt(`${this.state.year}${this.state.month}`, 10);
    return this.state.operationList.filter(operation => typeList.includes(operation.type) && operation.month === operationMonth).sort((a, b) => b.created - a.created);
  }

  getSum(type) {
    if (!type) {
      return 0;
    }

    return this.state[`${type}List`].reduce((a, b) => a + b.value, 0);
  }

  hideAdd() {
    this.setState({
      formAddValue: 0,
      formAddCategoryValue: '',
      formAddOperationCategory: '',
      isShowAddCategory: false,
      isShowAddOperation: false,
      formAddError: false,
    });
  }

  nextMonth() {
    this.setState({
      month: this.state.month === 11 ? 0 : this.state.month + 1,
      year: this.state.month === 11 ? this.state.year + 1 : this.state.year,
    }, () => {
      this.spreadOperations();
    });
  }

  prevMonth() {
    this.setState({
      month: this.state.month === 0 ? 11 : this.state.month - 1,
      year: this.state.month === 0 ? this.state.year - 1 : this.state.year,
    }, () => {
      this.spreadOperations();
    });
  }

  onRemoveOperation(operation) {
    this.setState({
      isShowRemoveModal: true,
      operationToRemove: operation,
    })
  }

  removeOperation() {
    if (!this.state.operationToRemove) {
      return;
    }

    storage.getData('db').then(db => {
      log('removeOperation', this.state.operationToRemove);

      db.operationList = db.operationList.filter(operation => operation._id !== this.state.operationToRemove._id);

      if (typeof db.balance === 'undefined') {
        db.balance = 0;
      }

      if (this.state.operationToRemove.type === 'income') {
        db.balance -= this.state.operationToRemove.value;
      } else if (this.state.operationToRemove.type === 'outcome') {
        db.balance += this.state.operationToRemove.value;
      }

      storage.setData('db', db).then(() => {
        this.setState({
          operationList: db.operationList,
          operationToRemove: null,
          isShowRemoveModal: false,
        }, () => {
          this.getDb();
        });
      });
    });
  }

  render() {
    const { navigation, navigation: { navigate } } = this.props;
    const { incomeList, outcomeList, isShowAddOperation, isShowAddCategory, settingsCurrency } = this.state;
    const sumIncome = this.getSum('income');
    const sumOutcome = this.getSum('outcome');
    const profit = sumIncome - sumOutcome;

    log('OperationList', 'render');

    return (
      <View style={styles.container}>
        <View
          style={{
            position: 'absolute',
            borderBottomColor: '#eee',
            borderBottomWidth: 1,
            top: 0,
            left: 0,
            height: 70,
            backgroundColor: '#fff'
          }}
        >
          <View style={{flex: 1, width: width, height: 40}}>
            <Text style={{fontSize: 16, textAlign: 'center', paddingTop: 5}}>{format.getMonthName(this.state.month)}, {this.state.year}</Text>
            <Text style={{color: profit === 0 ? '#333' : profit > 0 ? '#009900' : '#ff0000', fontSize: 10, fontWeight: 'bold', textAlign: 'center', paddingTop: 3}}>
              {format.currency(this.state.settingsCurrency, profit)}
            </Text>
          </View>

          <View style={{
            flex: 0,
            flexDirection: 'row',
            height: 30,
            width: width
          }}>
            <View style={{flex: 1, width: width / 2, justifyContent: 'center', alignItems: 'flex-start'}}>
              <Text style={{color: '#009900', fontSize: 16, fontWeight: 'bold', paddingLeft: 10}}>{format.currency(settingsCurrency, sumIncome)}</Text>
            </View>
            <View style={{flex: 1, width: width / 2, justifyContent: 'center', alignItems: 'flex-end'}}>
              <Text style={{color: '#ff0000', fontSize: 16, fontWeight: 'bold', paddingRight: 10}}>-{format.currency(settingsCurrency, sumOutcome)}</Text>
            </View>
          </View>
        </View>

        <View style={{
          flex: 0,
          flexDirection: 'row',
          height: height - 70 - 60 - 124,
          top: 70,
          left: 0,
          width: width,
          position: 'absolute',
          backgroundColor: '#fff'
        }}>
          <View style={{flex: 1, width: width / 2, backgroundColor: 'transparent', padding: 5}}>
            <FlatList
              data={incomeList.map(income => ({...income, key: `income-${income._id}`}))}
              renderItem={({item}) => <Operation {...item} currency={settingsCurrency} onPress={() => this.onRemoveOperation(item)} />}
            />
          </View>
          <View style={{flex: 1, width: width / 2, backgroundColor: '#fff', padding: 5}}>
            <FlatList
              data={outcomeList.map(outcome => ({...outcome, key: `outcome-${outcome._id}`}))}
              renderItem={({item}) => <Operation {...item} currency={settingsCurrency} onPress={() => this.onRemoveOperation(item)} />}
            />
          </View>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'absolute',
            height: 60,
            width: width,
            bottom: 0,
            left: 0,
            backgroundColor: '#fff',
            paddingLeft: 10,
            paddingRight: 10,
            borderTopColor: '#eee',
            borderTopWidth: 1
          }}
        >
          <Button type={'default'} icon={'chevron-left'} width={40} height={40} iconSize={20} onPress={() => this.prevMonth()} />
          <Button type={'success'} icon={'plus'} width={40} height={40} iconSize={20} onPress={() => this.props.navigation.navigate('AddOperation')} />
          <Button type={'default'} icon={'chevron-right'} width={40} height={40} iconSize={20} onPress={() => this.nextMonth()} />
        </View>

        {this.state.isShowRemoveModal
          ? (
            <Modal>
              <Text style={{textAlign: 'center', marginBottom: 20}}>Remove operation?</Text>

              <View style={{flexDirection: 'row'}}>
                <Button width={80} height={40} fontSize={14} title={'Cancel'} type={'default'} onPress={() => this.setState({isShowRemoveModal: false, operationToRemove: null})}/>
                <Button width={80} height={40} fontSize={14} title={'Remove'} type={'danger'} onPress={() => this.removeOperation()}/>
              </View>
            </Modal>
          )
          : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
