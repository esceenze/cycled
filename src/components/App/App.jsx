import React, {Component, PropTypes} from 'react';
import Loader from '../Loader';
import '../../styles/bootstrap.scss';
import './styles.sass';

export const defaultProps = {
  account: {
    userId: 1,
    token: '1',
  },
  isLoading: false,
  isBackgroundLoading: false,
  handleLogout: () => {},
  fetchInitialAppData: () => {},
  location: {},
};

export default class App extends Component {

  static propTypes = {
    children: PropTypes.element,
    account: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isBackgroundLoading: PropTypes.bool.isRequired,
    handleLogout: PropTypes.func.isRequired,
    fetchInitialAppData: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
  }

  static defaultProps = defaultProps;

  componentWillMount() {
    const {account, fetchInitialAppData} = this.props;
    fetchInitialAppData(account.userId, account.token);
  }

  render() {
    const {isLoading, children, handleLogout, account, location, isBackgroundLoading} = this.props;
    return (
      <div className="app">
        <Loader isLoading={isLoading} isBackgroundLoading={isBackgroundLoading}/>
        <main className="main-content-container">
          {children}
        </main>
      </div>
    );
  }
}
