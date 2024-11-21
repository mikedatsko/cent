import React from 'react';
import { View } from 'react-native';
import { Logo } from '../Logo';
import { storage, log } from '../../services';

export default class Loader extends React.Component {
  componentDidMount() {
    storage.getData('db')
      .then(db => {
        log('Loader', 'db', db);

        if (!db.firstStart) {
          this.resetDb();
          return;
        }

        this.goToHome();
      })
      .catch(e => this.resetDb());
  }

  resetDb() {
    storage.setData('db', {
      operationList: [],
      categoryList: [],
      settingsCurrency: 'USD',
      balance: 0,
      firstStart: true,
    }).then(() => {
      this.goToHome();
    });
  }

  goToHome() {
    setTimeout(() => this.props.navigation.navigate('OperationList', {balance: 0, currency: ''}), 1000);
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff'}}>
        <Logo width={100} marginLeft={0}/>
      </View>
    );
  }
}
