import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

export function requireAuthentication(Component) {
  class AuthenticatedComponent extends React.Component {

    componentWillMount() {
      this.checkAuth();
    }

    componentWillReceiveProps() {
      this.checkAuth();
    }

    static propTypes = {
      isAuthenticated: PropTypes.bool.isRequired,
      location: PropTypes.object.isRequired,
      navigate: PropTypes.func.isRequired,
    }

    checkAuth() {
      const {isAuthenticated, location, navigate} = this.props;
      if (!isAuthenticated) {
        const redirectAfterLogin = location.pathname;
        navigate(`/login?next=${redirectAfterLogin}`);
      }
    }

    render() {
      const {isAuthenticated} = this.props;

      return (
        <div>
          {isAuthenticated === true
            ? <Component {...this.props}/>
            : null
          }
        </div>
      );
    }
  }

  const mapStateToProps = (state, ownProps) => ({
    token: state.account.token,
    isAuthenticated: state.account.isAuthenticated,
    location: ownProps.location,
  });

  const mapDispatchToProps = dispatch => ({
    navigate(path) {
      dispatch(push(path));
    },
  });

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}
