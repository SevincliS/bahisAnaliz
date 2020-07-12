import React, {Component} from 'react';
import * as RNIap from 'react-native-iap';
import {connect} from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {setUser as setUserAction} from '../redux/actions/userActions';

const width = Dimensions.get('screen').width / 360;
const height = Dimensions.get('screen').height / 640;
const gif = require('../images/vip.png');
class Vip extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    try {
      const products = await RNIap.getSubscriptions([
        'weekly',
        'monthly',
        'seasonal',
        'yearly',
      ]);
      this.setState({products});
    } catch (err) {
      console.warn(err); // standardized err.code and err.message available
    }
  }

  requestSubscription = async subType => {
    try {
      await RNIap.requestSubscription(subType);
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageView}>
          <Image resizeMode="contain" style={styles.image} source={gif} />
        </View>
        <View style={styles.vipHeaderContainer}>
          <Text style={styles.vipText}>VİP ÜYELİK PAKETLERİ</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            this.requestSubscription('weekly');
          }}>
          <View style={styles.vipsContainer}>
            <Text style={styles.vipTimeText}>Haftalık</Text>
            <View style={styles.priceView}>
              <Text Text style={styles.vipPriceText}>
                ₺9.99
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            this.requestSubscription('monthly');
          }}>
          <View style={styles.vipsContainer}>
            <Text style={styles.vipTimeText}>Aylık</Text>
            <View style={styles.priceView}>
              <Text style={styles.vipPriceText}>₺24.99</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            this.requestSubscription('seasonal');
          }}>
          <View style={styles.vipsContainer}>
            <Text style={styles.vipTimeText}>3 Aylık</Text>
            <View style={styles.priceView}>
              <Text style={styles.vipPriceText}>₺64.99</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            this.requestSubscription('yearly');
          }}>
          <View style={styles.vipsContainer}>
            <Text style={styles.vipTimeText}>Yıllık</Text>
            <View style={styles.priceView}>
              <Text style={styles.vipPriceText}>₺149.99</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFCC00',
    justifyContent: 'center',
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
    height: 220 * height,
    alignSelf: 'center',
    marginBottom: 15 * height,
  },
  vipHeaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 0 * width,
  },
  vipText: {
    textAlign: 'center',
    fontFamily: 'roboto',
    fontSize: 20 * height,
    marginBottom: 10 * height,
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
  modalView: {
    width: 306 * width,
    height: 292 * height,
    backgroundColor: '#28616B',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10 * width,
  },
  vipPriceText: {
    textAlign: 'center',
    fontFamily: 'roboto',
    fontSize: 20 * height,
  },
  googleIcon: {
    width: 50 * width,
    height: 50 * height,
  },
  facebookIcon: {
    width: 50 * width,
    height: 50 * height,
  },
  appIcon: {
    width: 96 * width,
    height: 96 * height,
    marginTop: 24 * height,
  },
  subscribeText: {
    marginTop: 27 * height,
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  orText: {
    marginHorizontal: 16 * width,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

/*<View style={styles.header}>
          <Text style={styles.headerText}>
            Uzman ekibimiz tarafından titizlikle hazırlanmış kazandırma yüzdesi
            yüksek maçları sizlerle paylaşıyoruz.
          </Text>
        </View>*/
const mapStateToProps = state => {
  const {user} = state;
  return {user};
};
const mapDispatchToProps = dispatch => {
  return {
    setUser: user => dispatch(setUserAction(user)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Vip);
