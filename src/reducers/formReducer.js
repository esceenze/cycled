import {ACCOUNT_LOGIN_FAILURE} from 'actions/account';

const formReducerPlugin = {
  login: (state, action) => {
    switch (action.type) {
      case ACCOUNT_LOGIN_FAILURE:
        return {
          ...state,
          _error: 'Incorrect email or/and password.',
        };
      default:
        return state;
    }
  },
};

export default formReducerPlugin;
