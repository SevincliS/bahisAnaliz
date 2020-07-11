import React, {Component} from 'react';
import {Text, View, Dimensions, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import db from '@react-native-firebase/database';

const width = Dimensions.get('screen').width / 360;
const height = Dimensions.get('screen').height / 640;
class LiveBets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bets: {},
    };
    this.loadBets();
  }
  loadBets = () => {
    db()
      .ref('/liveBets')
      .on('value', bets => {
        if (bets.val() !== null) {
          this.setState({bets: bets.val()});
        }
      });
  };

  render() {
    const {bets} = this.state;
    let newBet = [];
    for (let i = 1; i < bets.length; i++) {
      newBet.push(
        <View style={styles.container}>
          <View style={styles.titleDateContainer}>
            <Text style={styles.titleText}>{bets[i].title}</Text>
            <Text style={styles.dateText}>{bets[i].score}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.timeText}>{bets[i].time}</Text>
            <View style={styles.ligContainer}>
              <Text style={styles.ligText}>{bets[i].league}</Text>
            </View>
            <LinearGradient
              start={{x: 0.0, y: 0}}
              end={{x: 1, y: 1.0}}
              colors={['#28616B', '#20AE02']}
              style={styles.tahminContainer}>
              <Text style={styles.tahminText}>{bets[i].estimation}</Text>
              <Text style={styles.tahminText}>{bets[i].rate}</Text>
              <Text style={styles.tahminText}>{bets[i].percent}</Text>
            </LinearGradient>
          </View>
        </View>,
      );
    }

    return newBet;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFCC00',
    width: 360 * width,
    height: 90 * height,
    justifyContent: 'center',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    marginBottom: 15 * height,
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
  timeText: {
    alignSelf: 'center',
    fontFamily: 'roboto',
    fontSize: 16 * height,
  },
  titleText: {fontSize: 16 * height},
  dateText: {
    fontSize: 14 * height,
    fontFamily: 'roboto',
  },
  blur: {
    width: 112 * width,
    height: 25 * height,
  },
});

export default LiveBets;
