import React from 'react';
import Router from './Router';
import LogIn from './pages/LogIn';
import {connect} from 'react-redux';

class Sponge extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    const {user} = this.props;
    return user.loggedIn ? <Router /> : <LogIn />;
  }
}

const mapStateToProps = state => {
  const {user} = state;
  return {user};
};
export default connect(
  mapStateToProps,
  null,
)(Sponge);
