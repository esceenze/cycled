// @flow

import { connect } from 'react-redux';
import { accountLogoutAndRedirect } from '../actions/account';
import { fetchInitialAppData } from '../actions/app';
import App from '../components/App';

function mapStateToProps(state: object, props: object): object {
  return {
    isLoading: state.loader.fetchingComponents > 0,
    isBackgroundLoading: state.loader.backgroundFetchingComponents > 0,
    children: props.children,
    account: state.account,
    location: props.location,
  };
}

const mapDispatchToProps = dispatch => ({
  handleLogout() {
    dispatch(accountLogoutAndRedirect());
  },
  fetchInitialAppData(userId: number) {
    dispatch(fetchInitialAppData(userId));
  },
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
