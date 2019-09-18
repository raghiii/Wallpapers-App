import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './src/store/index';
import Main from './src/Main';
import AppNavigator from './src/appNavigator';

const store = configureStore().store;

export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Provider store={store}>
          {/* <Main></Main> */}
          <AppNavigator></AppNavigator>
        </Provider>
      </View>
    );
  }
}
