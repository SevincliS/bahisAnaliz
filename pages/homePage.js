import React, {Component} from 'react';
import RNIap, {
  purchaseErrorListener,
  purchaseUpdatedListener,
} from 'react-native-iap';
import {StyleSheet, ScrollView, View, TouchableOpacity} from 'react-native';
import Orientation from 'react-native-orientation';
import {connect} from 'react-redux';
import Header from '../components/Header';
import FreeUserBets from '../components/FreeUserBets';
import VipUserBets from '../components/VipUserBets';

import {setVip as setVipAction} from '../redux/actions/userActions';

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    Orientation.lockToPortrait();
    const {setVip} = this.props;
    const purchases = await RNIap.getAvailablePurchases();
    console.log(purchases);
    this.purchaseUpdateSubscription = purchaseUpdatedListener(purchase => {
      setVip();
      console.log('this is vip bitch');
      purchaseErrorListener(err => {
        console.log(err);
      });
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
    setVip: () => dispatch(setVipAction()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
