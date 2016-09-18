import React, { PropTypes, Component } from 'react';
import {reduxForm, Field} from 'redux-form';
import cx from 'classnames';
import { push } from 'react-router-redux';
import './styles.sass';

const renderInput = ({input, inputClass = 'form-control', containerClass = '', type, placeholder, meta: {touched, error, invalid}}) =>
  <div className={containerClass}>
    <input {...input}
      className={cx(inputClass, {
        'form-control-danger': invalid,
      })}
      type={type}
      placeholder={placeholder}
      />
    {touched &&
     error &&
     <small className="text-danger text-xs-left p-l-2">{error}</small>}
  </div>;

renderInput.propTypes = {
  input: PropTypes.any.isRequired,
  inputClass: PropTypes.string.isRequired,
  containerClass: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
};

class Login extends Component {

  static propTypes = {
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
    const {error, handleSubmit, submitting, validateAndSubmit} = this.props;
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
                placeholder="Your@email.com"
                type="text" />
              <Field
                name="password"
                component={renderInput}
                inputClass="form-control form-control-rounded form-control-lg form-control-white"
                containerClass="m-b-1"
                placeholder="Password"
                type="password" />
              <div className="text-xs-center">
                <button type="submit" disabled={submitting} className="btn btn-success">Let's start rockin'</button>
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

export default LoginForm;
