import { connect } from 'react-redux';
import { accountLogin } from 'actions/account';
import {validateEmail} from 'utils/validate';
import { SubmissionError } from 'redux-form';
import Login from 'components/Login';

const validateAndSubmit = (values, dispatch) => {
  return new Promise((resolve) => {
    if (!validateEmail(values.email)) {
      throw new SubmissionError({ email: 'Please enter correct email' });
    }
    else {
      dispatch(accountLogin(values.email, values.password));
      resolve();
    }
  });
};

function mapStateToProps(state) {
  return {
    validateAndSubmit,
    isAuthenticated: state.account.isAuthenticated,
  };
}

export default connect(
  mapStateToProps
)(Login);
