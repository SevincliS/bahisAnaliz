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
import Modal from 'react-native-modal';
import db from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';

import {LoginManager, AccessToken} from 'react-native-fbsdk';
const width = Dimensions.get('screen').width / 360;
const height = Dimensions.get('screen').height / 640;
const gif = require('../images/vip.png');
class Vip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogInModal: false,
    };
  }

  async componentDidMount() {
    GoogleSignin.configure({
      webClientId:
        '807806732564-67te0omh0dalj84orqiubfftip5etvje.apps.googleusercontent.com',
    });
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
    const {user} = this.props;
    const {anonym} = user;
    if (!anonym) {
      try {
        await RNIap.requestSubscription(subType);
      } catch (err) {
        console.warn(err.code, err.message);
      }
    } else {
      this.setState({showLogInModal: true});
    }
  };

  onFacebookButtonPress = async () => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );
    auth()
      .signInWithCredential(facebookCredential)
      .then(async res => {
        this.logInCallback(res);
      });
    return auth().signInWithCredential(facebookCredential);
  };
  onGoogleButtonPress = async () => {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    auth()
      .signInWithCredential(googleCredential)
      .then(async res => {
        this.logInCallback(res);
      });
    return auth().signInWithCredential(googleCredential);
  };

  logInCallback = async res => {
    const {setUser} = this.props;
    const {uid, displayName: name, email} = res.user;
    this.setState({showLogInModal: false});
    await db()
      .ref(`users/${uid}`)
      .once('value')
      .then(user => {
        if (!user.val()) {
          db()
            .ref(`users/${uid}`)
            .set({uid, name, email});
          setUser({
            uid,
            name,
            email,
            subscriptionDate: null,
            subscriptionType: null,
            anonym: false,
          });
        } else {
          setUser({
            uid,
            name,
            email,
            anonym: false,
            subscriptionDate: new Date(user.val().subscriptionDate),
            subscriptionType: user.val().subscriptionType,
          });
        }
      });
  };
  render() {
    const {showLogInModal} = this.state;
    return (
      <View style={styles.container}>
        <Modal
          onBackdropPress={() => {
            this.setState({showLogInModal: false});
          }}
          isVisible={showLogInModal}>
          <View style={styles.modalView}>
            <Image style={styles.appIcon} source={{uri: 'guvercin'}} />
            <Text style={styles.subscribeText}>Abone olabilmek için</Text>
            <Text style={styles.logInText}>GİRİŞ YAPMALISINIZ</Text>
            <View style={styles.logInRow}>
              <TouchableOpacity
                onPress={() =>
                  this.onGoogleButtonPress()
                    .then(() => console.log('Signed in with Google!'))
                    .catch(err => {
                      console.log(err);
                    })
                }>
                <Image
                  style={styles.googleIcon}
                  source={{uri: 'google_icon_modal'}}
                />
              </TouchableOpacity>
              <Text style={styles.orText}>ya da</Text>
              <TouchableOpacity onPress={() => this.onFacebookButtonPress()}>
                <Image
                  style={styles.facebookIcon}
                  source={{uri: 'fb_icon_modal'}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  logInText: {
    marginTop: 6 * height,
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 3,
  },
  logInRow: {
    flexDirection: 'row',
    marginTop: 31 * height,
    alignItems: 'center',
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
