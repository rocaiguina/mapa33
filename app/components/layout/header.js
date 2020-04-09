import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { withRouter } from 'react-router';

import Icon from '../ui/Icon';

class Header extends Component {
  handleOnClose = () => {
    const { closeLink } = this.props;
    if (closeLink) {
      const { history } = this.props;
      history.push(closeLink);
    } else {
      window.history.back();
    }
  };

  render() {
    const headerClass = ClassNames('header', {
      'header-dark': this.props.dark,
      'has-actions': this.props.showProfileBtn || this.props.showMenuBtn,
    });

    return (
      <header className={headerClass}>
        <div className="container">
          <div className="header-wrap">
            {this.props.showCloseBtn && (
              <div className="top-actions">
                <Button size="large" type="link" onClick={this.handleOnClose}>
                  <Icon type="close" />
                </Button>
              </div>
            )}
            <div className="bottom-actions">
              {this.props.showProfileBtn && (
                <Link
                  to="/profile"
                  className="ant-btn ant-btn-lg ant-btn-round ant-btn-background-ghost"
                >
                  <Icon type="user" />
                </Link>
              )}
              {this.props.showMenuBtn && (
                <Button
                  size="large"
                  ghost
                  shape="round"
                  onClick={this.props.onMenuClick}
                >
                  <Icon type="menu" />
                </Button>
              )}
            </div>
            {this.props.title && (
              <div className="page-title">
                <h2>{this.props.title}</h2>
              </div>
            )}
            <div>{this.props.subtitle}</div>
          </div>
        </div>
      </header>
    );
  }
}

Header.defaultProps = {
  showCloseBtn: true,
  showProfileBtn: true,
  showMenuBtn: true,
};

Header.propTypes = {
  title: PropTypes.string,
  dark: PropTypes.bool,
  subtitle: PropTypes.node,
  onMenuClick: PropTypes.func,
  closeLink: PropTypes.string,
  showCloseBtn: PropTypes.bool,
  showMenuBtn: PropTypes.bool,
  showProfileBtn: PropTypes.bool,
  history: PropTypes.object,
};

export default withRouter(Header);
