import React, { Component } from 'react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';
import Header from './header';
import Sidebar from './sidebar';
import Footer from './footer';

class BaseLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSidebarVisible: false,
    };
  }

  handleOnMenuClick = () => {
    this.setState({
      isSidebarVisible: true,
    });
  };

  handleOnCloseSidebar = () => {
    this.setState({
      isSidebarVisible: false,
    });
  };

  render() {
    const layoutClass = ClassNames('main', {
      'main-dark': this.props.dark,
    });
    const wrapContentClass = ClassNames('wrap-content', {
      'with-title': this.props.title,
      'with-subtitle': this.props.subtitle,
      'with-actions': this.props.enableMenu,
      vcenter: this.props.verticalAlign == 'center',
    });

    return (
      <div className={layoutClass}>
        <Header
          dark={this.props.dark}
          title={this.props.title}
          subtitle={this.props.subtitle}
          onClose={this.props.onClose}
          closeLink={this.props.closeLink}
          showCloseBtn={this.props.showCloseBtn}
          showMenuBtn={this.props.enableMenu}
          showProfileBtn={this.props.enableMenu}
          onMenuClick={this.handleOnMenuClick}
        />
        <div className={wrapContentClass}>
          <div className="container">{this.props.children}</div>
        </div>
        <Footer
          dark={this.props.dark}
          rightComponent={this.props.footerRightComponent}
          xs={this.props.footerXs}
        />
        {this.props.afterFooter}
        {this.props.enableMenu && (
          <Sidebar
            placement="right"
            closable={true}
            visible={this.state.isSidebarVisible}
            onClose={this.handleOnCloseSidebar}
          />
        )}
      </div>
    );
  }
}

BaseLayout.defaultProps = {
  enableMenu: false,
  verticalAlign: 'center',
};

BaseLayout.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.node,
  dark: PropTypes.bool,
  children: PropTypes.node,
  closeLink: PropTypes.string,
  onClose: PropTypes.func,
  showCloseBtn: PropTypes.bool,
  enableMenu: PropTypes.bool,
  afterFooter: PropTypes.node,
  footerRightComponent: PropTypes.node,
  footerXs: PropTypes.node,
  verticalAlign: PropTypes.string,
};

export default BaseLayout;
