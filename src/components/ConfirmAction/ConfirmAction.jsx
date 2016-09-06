import React, { Component, PropTypes } from 'react';
import './styles.sass';

export default class ConfirmAction extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    action: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  handleToggleVisible = () => {
    this.setState({isVisible: !this.state.isVisible});
  }

  handleAccept = () => {
    const {action} = this.props;
    this.setState({isVisible: false});
    action();
  }

  render() {
    const {children, title, subtitle} = this.props;
    return (
      <span>
        <span onClick={this.handleToggleVisible}>{children}</span>
          {this.state.isVisible &&
            <div key="confirm-action" className="confirm-action rti-animation-fade">
              <div className="confirm-action-content">
                <h2 className="m-b-1">{title}</h2>
                {subtitle && <p className="m-b-1">{subtitle}</p>}
                <span className="btn btn-secondary m-r-dot5" onClick={this.handleToggleVisible}>Cancel</span>
                <span className="btn btn-success" onClick={this.handleAccept}>Ok</span>
              </div>
            </div>
          }
      </span>
    );
  }
}
