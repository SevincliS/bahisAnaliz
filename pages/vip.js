import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, Dimensions} from 'react-native';

const width = Dimensions.get('screen').width / 360;
const height = Dimensions.get('screen').height / 640;
const gif = require('../images/vip.png');
export default class vip extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageView}>
          <Image resizeMode="contain" style={styles.image} source={gif} />
        </View>
        <View style={styles.vipHeaderContainer}>
          <Text style={styles.vipText}>VİP ÜYELİK PAKETLERİ</Text>
        </View>
        <View style={styles.vipsContainer}>
          <Text style={styles.vipTimeText}>Günlük</Text>
          <View style={styles.priceView}>
            <Text style={styles.vipPriceText}>₺4.99</Text>
          </View>
        </View>
        <View style={styles.vipsContainer}>
          <Text style={styles.vipTimeText}>Haftalık</Text>
          <View style={styles.priceView}>
            <Text style={styles.vipPriceText}>₺9.99</Text>
          </View>
        </View>
        <View style={styles.vipsContainer}>
          <Text style={styles.vipTimeText}>Aylık</Text>
          <View style={styles.priceView}>
            <Text style={styles.vipPriceText}>₺24.99</Text>
          </View>
        </View>
        <View style={styles.vipsContainer}>
          <Text style={styles.vipTimeText}>3 Aylık</Text>
          <View style={styles.priceView}>
            <Text style={styles.vipPriceText}>₺64.99</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFCC00',
  },
  imageView: {
    backgroundColor: '#FFE064',
    marginVertical: 15 * height,
  },
  header: {
    backgroundColor: '#FFE064',
    justifyContent: 'center',
    alignItems: 'center',
    width: 292 * width,
    height: 83 * height,
    borderRadius: 11 * width,
    marginHorizontal: 34 * width,
    marginTop: 14 * height,
  },
  headerText: {
    textAlign: 'center',
    fontFamily: 'roboto',
    fontSize: 16 * height,
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 360 * width,
    height: 240 * height,
    alignSelf: 'center',
    marginBottom: 15 * height,
  },
  vipHeaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 66 * width,
  },
  vipText: {
    textAlign: 'center',
    fontFamily: 'roboto',
    fontSize: 20 * height,
    marginBottom: 15 * height,
  },
  vipsContainer: {
    backgroundColor: '#FFE064',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12 * height,
    marginHorizontal: 34 * width,
    width: 292 * width,
    height: 45 * height,
    borderRadius: 60 * width,
  },
  vipTimeText: {
    textAlign: 'center',
    fontFamily: 'roboto',
    fontSize: 20 * height,
    marginLeft: 28 * width,
  },
  priceView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: 90 * width,
  },
  vipPriceText: {
    textAlign: 'center',
    fontFamily: 'roboto',
    marginRight: 28 * width,
    fontSize: 20 * height,
  },
});

/*<View style={styles.header}>
          <Text style={styles.headerText}>
            Uzman ekibimiz tarafından titizlikle hazırlanmış kazandırma yüzdesi
            yüksek maçları sizlerle paylaşıyoruz.
          </Text>
        </View>*/
