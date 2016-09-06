// @flow

import {
  ACCOUNT_LOGIN_SUCCESS,
  ACCOUNT_LOGIN_FAILURE,
  ACCOUNT_LOGOUT,
} from 'actions/account';

const initialState = {
  userId: '',
  token: '',
  isAuthenticated: false,
  username: '',
  email: '',
};

export default (state: object = initialState, action: object): object => {
  switch (action.type) {
    case ACCOUNT_LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        token: action.token,
        userId: action.userId,
      };
    case ACCOUNT_LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
      };
    case ACCOUNT_LOGOUT:
      return initialState;
    default:
      return state;
  }
};
