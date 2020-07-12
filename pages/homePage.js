import React, {Component} from 'react';
import RNIap, {
  purchaseErrorListener,
  purchaseUpdatedListener,
} from 'react-native-iap';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import db from '@react-native-firebase/database';

import {connect} from 'react-redux';
import Header from '../components/Header';
import FreeUserBets from '../components/FreeUserBets';
import VipUserBets from '../components/VipUserBets';

import {
  resetUser as resetUserAction,
  updateSubscription as updateSubscriptionAction,
  setSubscription as setSubscriptionAction,
  setSubscription,
} from '../redux/actions/userActions';

const width = Dimensions.get('screen').width / 360;
const height = Dimensions.get('screen').height / 640;

class HomePage extends Component {
  constructor(props) {
    super(props);
    props.updateSubscription();
  }

  async componentDidMount() {
    this.purchaseUpdateSubscription = purchaseUpdatedListener(purchase => {
      const {user} = this.props;
      const {uid} = user;
      console.log(purchase);
      const {
        productId: subscriptionType,
        transactionDate: subscriptionDate,
      } = purchase;
      console.log({user});
      console.log({uid});
      console.log({subscriptionType, subscriptionDate});
      db()
        .ref(`users/${uid}`)
        .update({subscriptionDate, subscriptionType});
      setSubscription({subscriptionType, subscriptionDate});
    });
  }
  render() {
    const {resetUser, user} = this.props;
    const {vip} = user;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => resetUser()}>
          <Header />
        </TouchableOpacity>
        <ScrollView style={styles.betsContainer}>
          {!vip ? <VipUserBets /> : <FreeUserBets />}
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
const mapStateToProps = state => {
  const {user} = state;
  return {user};
};
const mapDispatchToProps = dispatch => {
  return {
    resetUser: () => dispatch(resetUserAction()),
    updateSubscription: () => dispatch(updateSubscriptionAction()),
    setSubscription: ({subscriptionDate, subscriptionType}) =>
      dispatch(setSubscriptionAction({subscriptionDate, subscriptionType})),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
