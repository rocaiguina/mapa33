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
    const layoutClass = ClassNames('main', this.props.className, {
      'main-dark': this.props.dark,
    });
    const wrapContentClass = ClassNames('wrap-content', {
      'with-title': this.props.title,
      'with-subtitle': this.props.subtitle,
      vcenter: this.props.verticalAlign == 'center',
    });

    return (
      <div className={layoutClass}>
        <Header
          dark={this.props.dark}
          title={this.props.title}
          subtitle={this.props.subtitle}
          closeLink={this.props.closeLink}
          showMenuBtn={this.props.showCloseBtn}
          showProfileBtn={this.props.showCloseBtn}
          onMenuClick={this.handleOnMenuClick}
          closeLinkClassname={this.props.closeLinkClassname}
          disableBorder={this.props.disableBorder}
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
        <Sidebar
          placement="right"
          visible={this.state.isSidebarVisible}
          onClose={this.handleOnCloseSidebar}
        />
      </div>
    );
  }
}

BaseLayout.defaultProps = {
  verticalAlign: 'center',
  disableBorder: false,
};

BaseLayout.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.node,
  dark: PropTypes.bool,
  children: PropTypes.node,
  closeLink: PropTypes.string,
  disableBorder: PropTypes.bool,
  showCloseBtn: PropTypes.bool,
  afterFooter: PropTypes.node,
  footerRightComponent: PropTypes.node,
  footerXs: PropTypes.node,
  verticalAlign: PropTypes.string,
  closeLinkClassname: PropTypes.string,
  className: PropTypes.string,
};

export default BaseLayout;
