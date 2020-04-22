import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { withRouter } from 'react-router';

import Icon from '../ui/Icon';

class Header extends Component {
  handleOnClose = () => {
    const { closeLink, onClose } = this.props;
    if (onClose) {
      return onClose();
    }
    
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
                <Button
                  size="large"
                  type="link"
                  onClick={this.handleOnClose}
                  className={this.props.closeLinkClassname}
                >
                  <Icon type="close" />
                </Button>
              </div>
            )}
            <div className="bottom-actions">
              {this.props.showProfileBtn && (
                <Link
                  id="user_guide"
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
  title: PropTypes.node,
  dark: PropTypes.bool,
  subtitle: PropTypes.node,
  onMenuClick: PropTypes.func,
  closeLink: PropTypes.string,
  showCloseBtn: PropTypes.bool,
  showMenuBtn: PropTypes.bool,
  showProfileBtn: PropTypes.bool,
  onClose: PropTypes.func,
  history: PropTypes.object,
  closeLinkClassname: PropTypes.string,
};

export default withRouter(Header);
