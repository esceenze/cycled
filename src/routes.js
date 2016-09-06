import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';
import App from 'containers/App';
import Login from 'containers/Login';
import Dashboard from 'containers/Dashboard';
import {requireAuthentication} from 'containers/AuthenticatedComponent';

export default (
  <Route>
    <Route path="/login" component={Login} />
    <Redirect from="/" to="/dashboard" />
    <Route component={requireAuthentication(App)}>
      <IndexRoute component={Dashboard}/>
      <Route path="/dashboard" component={Dashboard}/>
    </Route>
  </Route>
);
