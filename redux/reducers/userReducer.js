const INITIAL_STATE = {
  name: '',
  subscriptionDate: null,
  subscriptionType: null,
  email: '',
  loggedIn: false,
};

const isSubscribed = (subscriptionDate, subscriptionType) => {
  let dayAmount = 0;
  switch (subscriptionType) {
    case 'weekly':
      dayAmount = 7;
      break;
    case 'monthly':
      dayAmount = 30;
      break;
    case 'seasonal':
      dayAmount = 90;
      break;
    case 'yearly':
      dayAmount = 365;
      break;
    default:
      break;
  }

  return subscriptionDate
    ? (new Date() - new Date(subscriptionDate)) / (1000 * 3600 * 24) <
        dayAmount + 1
    : false;
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {...state, ...action.user, loggedIn: true};
    case 'RESET_USER':
      return INITIAL_STATE;
    case 'SET_SUBSCRIPTION':
      return {
        ...state,
        subscriptionDate: action.subscriptionDate,
        subscriptionType: action.subscriptionType,
      };
    case 'UPDATE_SUBSCRIPTION':
      return {...state, vip: isSubscribed()};
    default:
      return state;
  }
};

export default userReducer;
