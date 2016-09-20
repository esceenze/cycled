import React, { PropTypes, Component } from 'react';
import {reduxForm, Field} from 'redux-form';
import { intlShape, injectIntl, defineMessages } from 'react-intl';
import cx from 'classnames';
import { push } from 'react-router-redux';

import renderInput from '../Input';
import './styles.sass';

const messages = defineMessages({
  login_submit_btn: {
    id: 'login_submit_btn',
    defaultMessage: 'Let\'s start rockin\'',
  },
  password: {
    id: 'password',
    defaultMessage: 'Password',
  },
  your_email: {
    id: 'your_email',
    defaultMessage: 'Your@email.com',
  },
});

class Login extends Component {

  static propTypes = {
    intl: intlShape.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    validateAndSubmit: PropTypes.func.isRequired,
    error: PropTypes.string,
    submitting: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
  }

  componentWillMount() {
    this.checkAuth(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.checkAuth(nextProps);
  }

  checkAuth({isAuthenticated, nextPath, dispatch}) {
    if (isAuthenticated) {
      if (nextPath && 'next' in nextPath) {
        dispatch(push(nextPath.next));
        return null;
      }
      dispatch(push('/'));
    }
  }

  render() {
    const {error, handleSubmit, submitting, validateAndSubmit, intl: {formatMessage}} = this.props;
    return (
      <div className="login-page">
        <form className="login-form" onSubmit={handleSubmit(validateAndSubmit)}>
          <div className="text-xs-center">
            <span className="login-form-logo" />
          </div>
          <div className={cx('login-form-content', {
            'rti-animation-shake': error ? true : false,
          })}>
            {error &&
              <div className="alert alert-danger">{error}</div>}
              <Field
                name="email"
                component={renderInput}
                inputClass="form-control form-control-rounded form-control-lg form-control-white"
                containerClass="m-b-dot5"
                placeholder={formatMessage(messages.your_email)}
                type="text" />
              <Field
                name="password"
                component={renderInput}
                inputClass="form-control form-control-rounded form-control-lg form-control-white"
                containerClass="m-b-1"
                placeholder={formatMessage(messages.password)}
                type="password" />
              <div className="text-xs-center">
                <button type="submit" disabled={submitting} className="btn btn-success">{formatMessage(messages.login_submit_btn)}</button>
              </div>
          </div>
        </form>
      </div>
    );
  }
}

const LoginForm = reduxForm({
  form: 'login',
})(Login);

export default injectIntl(LoginForm);
