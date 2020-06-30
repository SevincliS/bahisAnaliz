import 'react-native-gesture-handler';

import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import React, {Component} from 'react';
import Router from './Router.js';

class App extends React.PureComponent {
  render() {
    return (
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    );
  }
}

export default App;
