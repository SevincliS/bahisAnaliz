import React, {Component} from 'react';
import {Text, View, Dimensions, StyleSheet} from 'react-native';

const width = Dimensions.get('screen').width / 360;
const height = Dimensions.get('screen').height / 640;
export default class Header extends Component {
  render() {
    return (
      <View stlye={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Cheap at BET</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: width * 360,
    height: 52 * height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#28616B',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 20 * height,
    fontFamily: 'roboto',
    color: '#FFFFFF',
  },
});
