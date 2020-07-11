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

import {connect} from 'react-redux';
import Header from '../components/Header';
import FreeUserBets from '../components/FreeUserBets';
import VipUserBets from '../components/VipUserBets';

import {resetUser as resetUserAction} from '../redux/actions/userActions';
import {updateSubscription as updateSubscriptionAction} from '../redux/actions/userActions';

const width = Dimensions.get('screen').width / 360;
const height = Dimensions.get('screen').height / 640;

class HomePage extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    props.updateSubscription();
  }

  componentDidMount() {
    this.purchaseUpdateSubscription = purchaseUpdatedListener(purchase => {
      console.log('purchaseUpdatedListener', purchase);
      const receipt = purchase.transactionReceipt;
      console.log(receipt);
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
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
