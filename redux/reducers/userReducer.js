const INITIAL_STATE = {
  vip: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_VIP':
      return {...state, vip: true};
    default:
      return state;
  }
};

export default userReducer;
