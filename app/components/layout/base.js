import React, { Component } from 'react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';
import Header from './header';
import Footer from './footer';

class BaseLayout extends Component {
  render () {
    const layoutClass = ClassNames('main', {
      'main-dark': this.props.dark
    });
    const contentClass = ClassNames('main-content', {
      'with-header': this.props.header,
      'with-subheader': this.props.subheader
    });

    return (
      <div className={layoutClass}>
        { this.props.header && <Header dark={this.props.darkHeader}>{this.props.header}{this.props.subheader}</Header> }
        <div className={contentClass}>
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

export default BaseLayout;
