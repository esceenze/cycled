import {createAction} from 'redux-actions';
import {FETCH, API} from '../constants';
import {push} from 'react-router-redux';
import cookies from 'cookies-js';

export const ACCOUNT_LOGIN_SUCCESS = 'ACCOUNT_LOGIN_SUCCESS';
export const ACCOUNT_LOGIN_FAILURE = 'ACCOUNT_LOGIN_FAILURE';
export const ACCOUNT_LOGIN = 'ACCOUNT_LOGIN';
export function accountLogin(email, password) {
  return {
    type: ACCOUNT_LOGIN,

    payload: {
      url: API.AUTHENTICATE,
      request: {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      },
    },
    meta: {
      type: FETCH,
      onSuccess: (payload) => {
        const {id: userId, token, ttl} = payload;
        cookies.set('token', token, {expires: 1000 * ttl});
        cookies.set('userId', userId, {expires: 1000 * ttl});
        return dispatch => dispatch(accountLoginSuccess(token, userId));
      },
      onFailure: createAction(ACCOUNT_LOGIN_FAILURE),
    },
  };
}

export function accountLoginSuccess(token, userId) {
  return {
    type: ACCOUNT_LOGIN_SUCCESS,
    token,
    userId,
  };
}


export function accountLogoutAndRedirect() {
  return dispatch => {
    cookies.expire('token');
    cookies.expire('userId');
    dispatch(accountLogout());
    dispatch(push('/login'));
  };
}

export const ACCOUNT_LOGOUT = 'ACCOUNT_LOGOUT';
export function accountLogout() {
  cookies.expire('token');
  cookies.expire('userId');
  return {
    type: ACCOUNT_LOGOUT,
  };
}

export const ACCOUNT_FETCH_INFO = 'ACCOUNT_FETCH_INFO';
export const ACCOUNT_FETCH_INFO_SUCCESS = 'ACCOUNT_FETCH_INFO_SUCCESS';
export const ACCOUNT_FETCH_INFO_FAILURE = 'ACCOUNT_FETCH_INFO_FAILURE';
export function accountFetchInfo() {
  return {
    type: ACCOUNT_FETCH_INFO,

    payload: {
      url: API.ACCOUNT_INFO,
      request: {
        method: 'GET',
        headers: {
          Authorization: true,
          'Content-type': 'application/json',
        },
      },
    },
    meta: {
      type: FETCH,
      onSuccess: createAction(ACCOUNT_FETCH_INFO_SUCCESS),
      onFailure: createAction(ACCOUNT_FETCH_INFO_FAILURE),
    },
  };
}
