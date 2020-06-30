import * as React from 'react';
import {Image, StyleSheet, Dimensions} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import vip from './pages/vip';
import homePage from './pages/homePage';

const height = Dimensions.get('screen').height / 640;
const width = Dimensions.get('screen').width / 640;
const Tab = createBottomTabNavigator();

export default function App() {
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
        component={homePage}
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
        component={vip}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  homePageIcon: {
    width: 60 * width,
    height: 60 * height,
  },
});
