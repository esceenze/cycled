import React, { PropTypes, Component } from 'react';
import {reduxForm, Field} from 'redux-form';
import cx from 'classnames';
import './styles.sass';

const renderInput = field =>
  <div>
    <input {...field.input} type={field.type}/>
    {field.meta.touched &&
     field.meta.error &&
     <span className="error">{field.meta.error}</span>}
  </div>;

class Login extends Component {

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    validateAndSubmit: PropTypes.func.isRequired,
    error: PropTypes.string,
    submitting: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  render() {
    const {error, handleSubmit, submitting} = this.props;
    return (
      <div className="login-page">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="text-xs-center m-b-1">
            <span className="login-form-logo" />
          </div>
          <div className={cx('login-form-content', {
            'rti-animation-shake': error ? true : false,
          })}>
            <h1 className="text-xs-center text-muted">1</h1>
            <h5 className="m-b-1 text-xs-center"><b>Please sign in</b></h5>
            {error &&
              <div className="alert alert-danger">{error}</div>}
              <Field
                name="username"
                component={renderInput}
                type="text" />
              <Field
                name="password"
                component={renderInput}
                type="password" />
              <button type="submit" disabled={submitting} className="btn btn-primary btn-block">Sign in, 1</button>
          </div>
        </form>
      </div>
    );
  }
}

const LoginForm = reduxForm({
  form: 'login',
})(Login);

export default LoginForm;
