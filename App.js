import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

import React from 'react';
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
