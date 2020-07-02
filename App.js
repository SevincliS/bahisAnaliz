import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import React from 'react';
import {store, persistor} from './redux/store/store';

import Sponge from './Sponge';

class App extends React.PureComponent {
  render() {
    return (
      <>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer>
              <Sponge />
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </>
    );
  }
}

export default App;
