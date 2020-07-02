import React from 'react';
import * as RNIap from 'react-native-iap';
import {Image, StyleSheet, Dimensions} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Vip from './pages/Vip';
import HomePage from './pages/HomePage';

const height = Dimensions.get('screen').height / 640;
const width = Dimensions.get('screen').width / 640;
const Tab = createBottomTabNavigator();

class Router extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
    // this.getProducts();
  }

  getProducts = async () => {
    try {
      /*const products = await RNIap.getSubscriptions([
        'weekly',
        'monthly',
        'seasonal',
        'yearly',
      ]);*/
      this.setState({products: []});
    } catch (err) {
      console.warn(err); // standardized err.code and err.message available
    }
  };

  render() {
    const {products} = this.state;
    return (
      <Tab.Navigator
        tabBarOptions={{
          showLabel: false,
          tabStyle: {
            height: 52,
            alignItems: 'center',
            justifyContent: 'center',
          },
          activeBackgroundColor: '#225159',
          inactiveBackgroundColor: '#28616B',
        }}>
        <Tab.Screen
          options={{
            tabBarIcon: () => (
              <Image
                style={styles.homePageIcon}
                resizeMode="contain"
                source={require('./images/ball.png')}
              />
            ),
          }}
          name="homePage"
          component={HomePage}
        />
        <Tab.Screen
          options={{
            tabBarIcon: () => (
              <Image
                style={styles.homePageIcon}
                resizeMode="contain"
                source={require('./images/diamondWhite.png')}
              />
            ),
          }}
          name="Vip"
          component={Vip}
          initialParams={{products}}
        />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  homePageIcon: {
    width: 60 * width,
    height: 60 * height,
  },
});

export default Router;
