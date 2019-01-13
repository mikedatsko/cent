import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import RootStack from './Routing';
import { log } from './services';

export default class App extends React.Component {
  handleNavigationChange = (navigation) => {
    log('navigation', navigation);
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="blue"
          barStyle="dark-content"
        />
        <RootStack
          onNavigationStateChange={this.handleNavigationChange}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
