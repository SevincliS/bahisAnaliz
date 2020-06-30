import React, {Component} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Header from '../components/header';
import Bet from '../components/bet';

const width = Dimensions.get('screen').width / 360;
const height = Dimensions.get('screen').height / 640;
export default class homePage extends Component {
  render() {
    return (
      <View>
        <Header />
        <Bet />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
