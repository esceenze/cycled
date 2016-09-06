// @flow

import React, {PropTypes} from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import cookies from 'cookies-js';
// import {accountLoginSuccess} from 'actions/account';
import routes from './routes';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);
const mountNode = document.getElementById('root');

const token = cookies.get('token');
const userId = cookies.get('userId');
if (token && userId) {
  // store.dispatch(accountLoginSuccess(token, userId));
}

const Root = ({store, history}) =>
  <Provider store={store} key="provider">
    <Router history={history}>
      {routes}
    </Router>
  </Provider>;

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};


render(
  <Root store={store} history={history}/>,
  mountNode
);
