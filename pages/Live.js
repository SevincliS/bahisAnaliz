import React, {Component} from 'react';
import RNIap, {
  purchaseErrorListener,
  purchaseUpdatedListener,
} from 'react-native-iap';
import {
  Dimensions,
  Text,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

import {connect} from 'react-redux';
import Header from '../components/Header';
import FreeUserBets from '../components/FreeUserBets';

import {resetUser as resetUserAction} from '../redux/actions/userActions';
import LiveBets from '../components/LiveBets';

const width = Dimensions.get('screen').width / 360;
const height = Dimensions.get('screen').height / 640;

class Live extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {resetUser, user} = this.props;
    const {navigation} = this.props;
    const {vip} = user;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => resetUser()}>
          <Header />
        </TouchableOpacity>

        {vip ? (
          <ScrollView style={styles.betsContainer}>
            <LiveBets />
          </ScrollView>
        ) : (
          <View>
            <FreeUserBets />
            <View style={styles.liveModal} />
            <View style={styles.liveModalContainer}>
              <Text
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  fontSize: 12 * height,
                  textAlign: 'center',
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  marginTop: 22 * height,
                  color: '#fff',
                  letterSpacing: 1,
                }}>
                Canlı maçları görebilmek için
              </Text>
              <View
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  alignItems: 'center',
                  alignSelf: 'center',
                  textAlign: 'center',
                }}>
                <Text
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    fontSize: 20 * height,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    marginTop: 17 * height,
                    color: '#fff',
                    letterSpacing: 1,
                    width: 200 * width,
                    height: 60 * width,
                  }}>
                  PREMIUM ÜYE OLMALISINIZ
                </Text>
              </View>
              <Image
                resizeMode="contain"
                style={styles.liveIcon}
                source={{uri: 'live_icon'}}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate('Vip')}
                style={styles.nextButton}>
                <Text
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    fontSize: 12 * height,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    textDecorationLine: 'underline',
                    color: '#fff',
                    letterSpacing: 0.8,
                  }}>
                  Üyelik sayfası için tıklayın
                </Text>
                <Image
                  resizeMode="contain"
                  style={styles.nextIcon}
                  source={{uri: 'next_icon'}}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  betsContainer: {
    backgroundColor: '#F5E08B',
  },
  container: {flex: 1},
  liveModalContainer: {
    width: 306 * width,
    height: 292 * height,
    backgroundColor: '#28616B',
    position: 'absolute',
    top: 109 * height,
    left: 27 * width,
    borderRadius: 10 * width,
  },
  liveModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    width: width * 360,
    height: height * 640,
    backgroundColor: '#000',
    opacity: 0.8,
  },
  liveIcon: {
    width: 130 * width,
    height: 96 * height,
    alignSelf: 'center',
    marginVertical: 18 * height,
  },
  nextIcon: {
    width: 16 * width,
    height: 16 * height,
    marginLeft: 7 * width,
  },
  nextButton: {
    flexDirection: 'row',
    marginBottom: 34 * height,
    alignSelf: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => {
  const {user} = state;
  return {user};
};
const mapDispatchToProps = dispatch => {
  return {
    resetUser: () => dispatch(resetUserAction()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Live);
