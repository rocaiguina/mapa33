import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import { Link } from 'react-router-dom';
import { Button, Col, Divider, Row } from 'antd';
import { withRouter } from 'react-router';

import Icon from '../ui/Icon';

class Header extends Component {
  render() {
    const headerClass = ClassNames('header', {
      'header-dark': this.props.dark,
      'has-actions': this.props.showProfileBtn,
    });

    return (
      <header className={headerClass}>
        <div className="container">
          <div className="header-wrap">
            <div className="top-actions">
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
            <Row>
              <Col md={20}>
                {this.props.title && (
                  <div className="page-title">{this.props.title}</div>
                )}
                <div>{this.props.subtitle}</div>
              </Col>
            </Row>
          </div>
          <Divider
            dashed
            style={{
              margin: '15px 0 0 0',
              borderStyle: 'dotted',
              borderColor: this.props.disableBorder
                ? 'transparent'
                : this.props.dark
                ? '#fff'
                : '#000',
            }}
          />
        </div>
      </header>
    );
  }
}

Header.defaultProps = {
  disableBorder: false,
  showMenuBtn: true,
  showProfileBtn: true,
};

Header.propTypes = {
  title: PropTypes.node,
  dark: PropTypes.bool,
  subtitle: PropTypes.node,
  onMenuClick: PropTypes.func,
  disableBorder: PropTypes.bool,
  showMenuBtn: PropTypes.bool,
  showProfileBtn: PropTypes.bool,
};

export default withRouter(Header);
