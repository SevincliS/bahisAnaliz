import React, {Component} from 'react';
import {Dimensions, StyleSheet, ScrollView, View} from 'react-native';

import Header from '../components/header';
import Bet from '../components/bet';

const width = Dimensions.get('screen').width / 360;
const height = Dimensions.get('screen').height / 640;
export default class homePage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <ScrollView style={styles.betsContainer}>
          <Bet />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  betsContainer: {
    backgroundColor: '#F5E08B',
  },
  container: {flex: 1},
});
