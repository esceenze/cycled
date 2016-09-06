// @flow

import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard';

function mapStateToProps(state: object, props: object): object {
  return {
    children: props.children,
    location: props.location,
  };
}

export default connect(
  mapStateToProps,
)(Dashboard);
