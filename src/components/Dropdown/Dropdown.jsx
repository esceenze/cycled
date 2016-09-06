import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import './styles.sass';

export default class Dropdown extends Component {

  static propTypes = {
    children: PropTypes.any.isRequired,
    trigger: PropTypes.element.isRequired,
    avoidAutoDissmiss: PropTypes.bool,
    alignRight: PropTypes.bool,
    alignTop: PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    };
  }

  toggleExpanded = () => {
    this.setState({isExpanded: !this.state.isExpanded});
  }

  render() {
    const { children, trigger, alignRight, avoidAutoDissmiss, alignTop } = this.props;
    const { isExpanded } = this.state;

    return (
      <span className={cx('react-dropdown', {
        'react-dropdown--expanded': isExpanded,
      })}>
        <span className="react-dropdown-trigger" onClick={this.toggleExpanded}>{trigger}</span>
        <div className="react-dropdown-back" onClick={this.toggleExpanded}></div>
        { isExpanded &&
          <div className={cx('react-dropdown-content', {
            'react-dropdown-content--right': alignRight,
            'react-dropdown-content--top': alignTop,
          })} onClick={() => {!avoidAutoDissmiss && this.toggleExpanded();}}>{children}</div>
        }
      </span>
    );
  }
}
