// TOTALY STOLEN FROM https://github.com/redux-effects/redux-effects-fetch/blob/master/src/index.js
import fetch from 'isomorphic-fetch';
import { FETCH } from '../constants';
import {
  loaderFetchingStarted,
  loaderFetchingComplete,
  loaderBackgroundFetchingStarted,
  loaderBackgroundFetchingComplete,
} from 'actions/loader';


function fetchAction(dispatch, action, getState) {
  const { headers } = action.payload.request;
  action.fetchInBackground
    ? dispatch(loaderBackgroundFetchingStarted(action.type))
    : dispatch(loaderFetchingStarted(action.type));
  action.type !== 'ACCOUNT_LOGIN' ? headers.Authorization = getState().account.token : null;
  fetch(action.payload.url, action.payload.request)
      .then(checkStatus)
      .then(createResponse, createErrorResponse)
      .then(res => {
        action.fetchInBackground
          ? dispatch(loaderBackgroundFetchingComplete(action.type))
          : dispatch(loaderFetchingComplete(action.type));
        return dispatch(action.meta.onSuccess(res.value));
      })
      .catch(err => {
        action.fetchInBackground
          ? dispatch(loaderBackgroundFetchingComplete(action.type))
          : dispatch(loaderFetchingComplete(action.type));
        return dispatch(action.meta.onFailure(err));
      });
}

function fetchMiddleware({dispatch, getState}) {
  return next => action => {
    next(action);
    if (action.meta !== undefined && action.meta.type === FETCH) {
      fetchAction(dispatch, action, getState);
    }
  };
}

function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res;
  }
  throw res;
}

function deserialize(res) {
  const header = res.headers.get('Content-Type') || '';
  if (header.indexOf('application/json') > -1) return res.json();
  if (header.indexOf('application/ld+json') > -1) return res.json();
  if (header.indexOf('application/octet-stream') > -1) return res.arrayBuffer();
  return res.text();
}

function createResponse(res) {
  // 204 status don't have JSON in response and trow error for DELETE method
  if (res.status === 204) {
    return {
      value: res.statusText,
    };
  }
  return deserialize(res).then(value => ({
    url: res.url,
    status: res.status,
    statusText: res.statusText,
    headers: res.headers,
    value: value,
  }));
}

function createErrorResponse(res) {
  return createResponse(res).then(res => {
    throw res;
  });
}

export default fetchMiddleware;
