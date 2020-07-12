import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {connect} from 'react-redux';
import {GoogleSignin} from '@react-native-community/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import db from '@react-native-firebase/database';
import {setUser as setUserAction} from '../redux/actions/userActions';

const width = parseInt(Dimensions.get('screen').width, 10) / 360;
const height = parseInt(Dimensions.get('screen').height, 10) / 640;

class LogIn extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    GoogleSignin.configure({
      webClientId:
        '807806732564-67te0omh0dalj84orqiubfftip5etvje.apps.googleusercontent.com',
    });
  }

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
          });
        } else {
          setUser({
            uid,
            name,
            email,
            subscriptionDate: new Date(user.val().subscriptionDate),
            subscriptionType: user.val().subscriptionType,
          });
        }
      });
  };

  render() {
    const {setUser} = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.onFacebookButtonPress();
          }}>
          <View style={styles.facebookView}>
            <Image style={styles.facebookIcon} source={{uri: 'fb_icon'}} />
            <Text style={styles.facebookText}>Facebook ile giriş yap</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.googleIconView}
          onPress={() =>
            this.onGoogleButtonPress()
              .then(() => console.log('Signed in with Google!'))
              .catch(err => {
                console.log(err);
              })
          }>
          <View style={styles.googleView}>
            <Image style={styles.googleIcon} source={{uri: 'google_icon'}} />
            <Text style={styles.googleText}>Google ile giriş yap</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.googleIconView}
          onPress={() => setUser({loggedIn: true, anonym: true})}>
          <View style={styles.anonymView}>
            <Text style={{fontSize: 12, marginVertical: 16 * width}}>
              ya da
            </Text>
            <Text style={{fontsize: 16, fontWeight: 'bold'}}>
              Anonim olarak devam et.
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  forgotText: {
    fontFamily: 'roboto',
    fontWeight: 'bold',
    letterSpacing: 0.015,
    color: '#051B27',
    fontSize: height * 13,
  },
  createText: {
    fontFamily: 'roboto',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    letterSpacing: 0.035,
    color: '#051B27',
    fontSize: height * 14,
  },
  forgotTextView: {
    alignItems: 'flex-end',
    width: width * 284,
    height: height * 20,
  },
  headerText: {
    alignSelf: 'center',
    fontFamily: 'roboto',
    fontSize: 40 * height,
    color: '#051B27',
    marginBottom: 36 * height,
    marginTop: 36 * height,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFCC00',
  },
  googleView: {
    flexDirection: 'row',
    marginTop: 15 * height,
    width: 255 * width,
    height: 45 * height,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#FFE98D',
    borderRadius: 5,
  },
  googleText: {
    color: '#000',
    fontSize: 16,
    marginLeft: 20 * width,
  },
  googleIcon: {
    width: 25 * width,
    height: 25 * height,
    marginLeft: 20 * width,
  },
  googleIconView: {
    marginTop: 6 * height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  facebookView: {
    width: 255 * width,
    height: 45 * height,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4267B2',
  },
  facebookText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 20 * width,
  },
  facebookIcon: {
    marginLeft: 20 * width,
    width: 25 * width,
    height: 25 * height,
  },
  anonymView: {alignItems: 'center'},
});

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => dispatch(setUserAction(user)),
  };
};
// Exports
export default connect(
  null,
  mapDispatchToProps,
)(LogIn);
