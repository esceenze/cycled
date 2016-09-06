import { connect } from 'react-redux';
import { accountLogin } from 'actions/account';
import {validateEmail} from 'utils/validate';
import Login from 'components/Login';

const handleSubmit = (values, dispatch) => {
  return new Promise((resolve, reject) => {
    if (!validateEmail(values.email)) {
      reject({ email: 'Please check your email' });
    }

    else {
      dispatch(accountLogin(values));
      resolve();
    }
  });
};

function mapStateToProps() {
  return {
    validateAndSubmit: handleSubmit,
  };
}

export default connect(
  mapStateToProps
)(Login);
