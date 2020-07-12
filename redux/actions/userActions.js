const setUser = user => ({
  type: 'SET_USER',
  user,
});

const updateSubscription = user => ({
  type: 'UPDATE_SUBSCRIPTION',
  user,
});

const setSubscription = ({subscriptionDate, subscriptionType}) => ({
  type: 'SET_SUBSCRIPTION',
  subscriptionDate,
  subscriptionType,
});

const resetUser = () => ({
  type: 'RESET_USER',
});

export {setUser, resetUser, updateSubscription, setSubscription};
