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
    let paddingTop = this.props.title != null ? 54 : 0;
    if (this.props.subtitle != null) {
      paddingTop += 40;
    }
    paddingTop = paddingTop + 'px';

    return (
      <div className={layoutClass}>
        <Header
          dark={this.props.dark}
          title={this.props.title}
          subtitle={this.props.subtitle}
          showCloseBtn={this.props.showCloseBtn}
          showMenuBtn={this.props.enableMenu}
          showProfileBtn={this.props.enableMenu}
          onMenuClick={this.handleOnMenuClick}
        />
        <div style={{ paddingTop: paddingTop }}>
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
  enableMenu: true,
};

BaseLayout.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.node,
  dark: PropTypes.bool,
  children: PropTypes.node,
  showCloseBtn: PropTypes.bool,
  enableMenu: PropTypes.bool,
  afterFooter: PropTypes.node,
  footerRightComponent: PropTypes.node,
  footerXs: PropTypes.node,
};

export default BaseLayout;
