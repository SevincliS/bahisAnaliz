import React from 'react';
import db from '@react-native-firebase/database';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {connect} from 'react-redux';
import {GoogleSignin} from '@react-native-community/google-signin';

import {LoginManager, AccessToken} from 'react-native-fbsdk';

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
    console.log('wtf');
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
    console.log(data);
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
    console.log({res});
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
          console.log(user.val());
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
        <Text style={styles.headerText}>Hackerrank JS</Text>

        <View style={styles.googleSigninView}>
          <Text style={styles.signInGoogleText}>or sign in with</Text>
          <TouchableOpacity
            style={styles.googleIconView}
            onPress={() =>
              this.onGoogleButtonPress()
                .then(() => console.log('Signed in with Google!'))
                .catch(err => {
                  console.log(err);
                })
            }>
            <Text>Google ile gir.</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => {
              this.onFacebookButtonPress();
            }}>
            <Text>FACEBOOKLA GIR</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.googleSigninView}>
          <TouchableOpacity
            style={styles.googleIconView}
            onPress={() => setUser({loggedIn: true})}>
            <Text>Anonim olarak devam et.</Text>
          </TouchableOpacity>
        </View>
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
  },
  googleSigninView: {
    marginTop: 15 * height,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInGoogleText: {
    fontSize: 13 * height,
    fontFamily: 'roboto',
    color: '#00132C',
    textAlign: 'center',
  },
  googleIcon: {
    width: 40.68 * width,
    height: 43 * height,
  },
  googleIconView: {
    marginTop: 6 * height,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
