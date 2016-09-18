// @flow

import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import {browserHistory, Router} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import configureStore from './store/configureStore';
import cookies from 'cookies-js';
import {Provider} from 'react-redux';
import {accountLoginSuccess} from 'actions/account';
import { AppContainer } from 'react-hot-loader';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);
const mountNode = document.getElementById('root');

const token = cookies.get('token');
const userId = cookies.get('userId');
if (token && userId) {
  store.dispatch(accountLoginSuccess(token, userId));
}

const renderApp = () => {
  const routes = require('./routes').default;

  render(
    <AppContainer>
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
    </AppContainer>,
    mountNode
  );
};

// Enable hot reload by react-hot-loader
if (module.hot) {
  const reRenderApp = () => {
    try {
      renderApp();
    }
    catch (error) {
      render(<span>{error}</span>, mountNode);
    }
  };

  module.hot.accept('./routes', () => {
    // Prevent the hot reloading error from react-router
    unmountComponentAtNode(mountNode);
    reRenderApp();
  });
}

renderApp();

// render(
//   <AppContainer>
//     <Provider store={store} key="provider">
//       <Router history={history} routes={routes} />
//     </Provider>
//     <Root store={store} history={history} routes={routes} />
//   </AppContainer>,
//   mountNode
// );
//
// if (module.hot) {
//   module.hot.accept('./components/Root', () => {
//     const RootComponent = require('./components/Root').default;
//     render(
//       <AppContainer>
//         <RootComponent store={store} history={history} routes={routes} />
//       </AppContainer>,
//       mountNode
//     );
//   });
// }
