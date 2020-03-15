import React, { Component } from 'react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';
import Header from './header';
import Footer from './footer';

class BaseLayout extends Component {
  render() {
    const layoutClass = ClassNames('main', {
      'main-dark': this.props.dark
    });
    const contentClass = ClassNames('main-content', {
      'with-header': this.props.header,
      'with-subheader': this.props.subheader
    });
    const paddingTop = this.props.subtitle != null ? '94px': '54px';

    return (
      <div className={layoutClass}>
        <Header
          dark={this.props.dark}
          title={this.props.title}
          subtitle={this.props.subtitle}
          actions={this.props.actions}
        />
        { /*this.props.header && <Header dark={this.props.darkHeader}>{this.props.header}{this.props.subheader}</Header> */}
        <div className={contentClass} style={{ paddingTop: paddingTop }}>
          <div className="container">
            { this.props.children }
          </div>
        </div>
        <Footer dark={this.props.dark} rightComponent={this.props.footerRightComponent} xs={this.props.footerXs}/>
        { this.props.afterFooter }
      </div>
    );
  }
}

BaseLayout.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.node,
  dark: PropTypes.bool,
  actions: PropTypes.array,
};

export default BaseLayout;
