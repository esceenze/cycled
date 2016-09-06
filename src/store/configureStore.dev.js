import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import fetchMiddleware from '../middleware/fetch-middleware.js';
import rootReducer from '../reducers';


export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(
      thunkMiddleware,
      fetchMiddleware,
      routerMiddleware(browserHistory),
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
