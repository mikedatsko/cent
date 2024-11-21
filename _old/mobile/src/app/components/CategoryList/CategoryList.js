import React from 'react';
import { Text, View, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { Balance } from '../Balance';
import { log, storage } from '../../services';
import { Button } from '../Button';
import { Modal } from '../Modal';

const { width, height } = Dimensions.get('window');

export default class CategoryList extends React.Component {
  state = {
    categoryList: [],
    categoryToRemove: null,
    isShowRemoveModal: false,
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
    log('CategoryList', 'componentDidMount');
    this.getDb();

    this.props.navigation.didFocus = () => {
      log('CategoryList', 'didFocus');
      this.getDb();
    };

    this.didBlurSubscription = this.props.navigation.addListener('didFocus', this.navigationDidFocus);
  }

  componentWillUnmount() {
    this.didBlurSubscription.remove();
  }

  navigationDidFocus = payload => {
    log('CategoryList', 'didFocus', payload);
    this.getDb();
  };

  getDb() {
    log('CategoryList', 'getDb');
    storage.getData('db').then(db => {
      log('CategoryList', 'db', db);
      this.setState({
        operationList: db.operationList,
        categoryList: db.categoryList,
        settingsCurrency: db.settingsCurrency || 'USD',
      }, () => {
        this.props.navigation.setParams({balance: db.balance, currency: db.settingsCurrency});
      });
    });
  }

  onRemoveCategory(category) {
    this.setState({
      isShowRemoveModal: true,
      categoryToRemove: category,
    })
  }

  removeCategory() {
    if (!this.state.categoryToRemove) {
      return;
    }

    storage.getData('db').then(db => {
      log('removeCategory', this.state.categoryToRemove);

      db.categoryList = db.categoryList.filter(category => category._id !== this.state.categoryToRemove._id);

      storage.setData('db', db).then(() => {
        this.setState({
          categoryList: db.categoryList,
          categoryToRemove: null,
          isShowRemoveModal: false,
        }, () => {
          this.getDb();
        });
      });
    });
  }

  render() {
    const { categoryList } = this.state;

    return (
      <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', backgroundColor: '#fff'}}>
        <FlatList
          style={{flex: 1, position: 'absolute', height: height - 185}}
          data={categoryList.map(outcome => ({...outcome, key: `category-${outcome._id}`}))}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{padding: 10, borderBottomColor: '#eee', borderBottomWidth: 1, width: width}}
              onPress={() => this.onRemoveCategory(item)}
            >
              <Text style={{color: item.type === 'income' ? '#009900' : '#ff0000'}}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
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
          <Button type={'success'} icon={'plus'} width={40} height={40} iconSize={20} onPress={() => this.props.navigation.navigate('AddCategory')} />
        </View>

        {this.state.isShowRemoveModal
          ? (
            <Modal>
              <Text style={{textAlign: 'center', marginBottom: 20}}>Remove category?</Text>

              <View style={{flexDirection: 'row'}}>
                <Button width={80} height={40} fontSize={14} title={'Cancel'} type={'default'} onPress={() => this.setState({isShowRemoveModal: false, categoryToRemove: null})}/>
                <Button width={80} height={40} fontSize={14} title={'Remove'} type={'danger'} onPress={() => this.removeCategory()}/>
              </View>
            </Modal>
          )
          : null
        }
      </View>
    );
  }
}
