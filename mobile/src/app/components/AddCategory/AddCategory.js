import React from 'react';
import { TextInput, View } from 'react-native';
import { Button } from '../Button';
import { Balance } from '../Balance';
import { log, storage } from '../../services';

export default class AddCategory extends React.Component {
  state = {
    formAddCategoryTitle: '',
    formAddCategoryType: 'income',
    formAddError: false,
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
    log('AddCategory', 'componentDidMount');
    this.getDb();

    this.props.navigation.didFocus = () => {
      log('AddCategory', 'didFocus');
      this.getDb();
    };

    this.didBlurSubscription = this.props.navigation.addListener('didFocus', this.navigationDidFocus);
  }

  componentWillUnmount() {
    this.didBlurSubscription.remove();
  }

  navigationDidFocus = payload => {
    log('AddCategory', 'didFocus', payload);
    this.getDb();
    this.textInput.clear();
  };

  getDb() {
    log('AddCategory', 'getDb');
    storage.getData('db').then(db => {
      log('AddCategory', 'db', db);
      this.setState({
        operationList: db.operationList,
        categoryList: db.categoryList,
        settingsCurrency: db.settingsCurrency || 'USD',
      }, () => {
        this.props.navigation.setParams({balance: db.balance, currency: db.settingsCurrency});
      });
    });
  }

  addCategory() {
    log('AddCategory', 'addCategory', this.state.formAddCategoryTitle);
    this.setState({formAddError: false});

    if (!this.state.formAddCategoryTitle) {
      this.setState({formAddError: true});
      return;
    }

    storage.getData('db').then(db => {
      const created = new Date().getTime();
      const newCategory = {
        _id: `category-${created}`,
        created: created,
        title: this.state.formAddCategoryTitle,
        type: this.state.formAddCategoryType
      };

      db.categoryList = [...db.categoryList, newCategory];
      db.categoryList.sort((a, b) => {
        if (a.title > b.title) {
          return 1;
        } else if (a.title < b.title) {
          return -1;
        }
        return 0;
      });

      log('categoryList', db.categoryList);

      return storage.setData('db', db);
    }).then(() => {
      this.textInput.clear();
      log('textInput');
      this.setState({
        formAddCategoryTitle: '',
        formAddCategoryType: 'income',
      }, () => {
        this.props.navigation.navigate('CategoryList');
      });
    });
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View
          style={{
            flex: 0,
            flexDirection: 'row',
            padding: 20,
          }}
        >
          <View style={{flex: 0, alignItems: 'center', justifyContent: 'center', width: 40}} />

          <TextInput
            style={{
              flex: 1,
              fontSize: 16,
              textAlign: 'center',
              borderBottomWidth: 1,
              borderBottomColor: '#333',
              backgroundColor: this.state.formAddError && !this.state.formAddCategoryTitle ? 'rgba(255,0,0,0.2)' : null
            }}
            placeholder={'Category name'}
            autoFocus={true}
            onChangeText={text => this.setState({formAddCategoryTitle: text})}
            ref={input => { this.textInput = input }}
          />

          <View style={{flex: 0, alignItems: 'center', justifyContent: 'center', width: 40}} />
        </View>

        <View style={{padding: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <Button
            icon={'plus'}
            title={'Income'}
            onPress={() => this.setState({formAddCategoryType: 'income'})}
            type={this.state.formAddCategoryType === 'income' ? 'success' : 'default'}
            width={110}
            height={40}
            iconSize={16}
            fontSize={16}
          />

          <Button
            icon={'minus'}
            title={'Outcome'}
            onPress={() => this.setState({formAddCategoryType: 'outcome'})}
            type={this.state.formAddCategoryType === 'outcome' ? 'danger' : 'default'}
            width={110}
            height={40}
            iconSize={16}
            fontSize={16}
          />
        </View>

        <View style={{padding: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <Button
            icon={'slash'}
            onPress={() => this.props.navigation.navigate('CategoryList')}
            type={'default'}
            width={50}
            height={50}
            iconSize={20}
          />

          <Button
            icon={'check'}
            onPress={() => this.addCategory()}
            type={'success'}
            width={50}
            height={50}
            iconSize={20}
          />
        </View>
      </View>
    );
  }
}
