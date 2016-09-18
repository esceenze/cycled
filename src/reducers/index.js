// @flow

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';
import loader from './loader';
import account from './account';

const rootReducer = combineReducers({
  routing: routerReducer,
  loader,
  account,
  form: formReducer,
});

export default rootReducer;
