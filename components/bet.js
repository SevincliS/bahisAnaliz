import React, {Component} from 'react';
import {Text, View, Dimensions, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const width = Dimensions.get('screen').width / 360;
const height = Dimensions.get('screen').height / 640;
export default class bet extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleDateContainer}>
          <Text style={{fontSize: 16 * height}}>Fenerbahçe - Ankaragücü</Text>
          <Text style={{fontSize: 14 * height, fontFamily: 'roboto'}}>
            20/06/2020
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text
            style={{
              alignSelf: 'center',
              fontFamily: 'roboto',
              fontSize: 16 * height,
            }}>
            21:00
          </Text>
          <View style={styles.ligContainer}>
            <Text style={styles.ligText}>Türkiye-Süper Lig</Text>
          </View>
          <LinearGradient
            start={{x: 0.0, y: 0}}
            end={{x: 1, y: 1.0}}
            colors={['#28616B', '#20AE02']}
            style={styles.tahminContainer}>
            <Text style={styles.tahminText}>MS 1</Text>
            <Text style={styles.tahminText}>1.35</Text>
            <Text style={styles.tahminText}>%95</Text>
          </LinearGradient>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFCC00',
    width: 360 * width,
    height: 90 * height,
    justifyContent: 'center',
    borderTopWidth: 0.25,
    borderBottomWidth: 0.25,
  },
  titleDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 24 * width,
  },
  tahminContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 112 * width,
    height: 25 * height,
    borderRadius: 5 * width,
  },
  ligContainer: {
    backgroundColor: '#FFE98D',
    justifyContent: 'center',
    alignItems: 'center',
    width: 123 * width,
    height: 25 * height,
    borderRadius: 5 * width,
  },
  infoContainer: {
    marginHorizontal: 24 * width,
    marginTop: 14 * height,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tahminText: {
    color: '#FFFFFF',
    fontFamily: 'roboto',
    fontSize: 12 * height,
  },
  ligText: {
    textAlign: 'center',
    fontSize: 12 * height,
    fontFamily: 'roboto',
  },
});
