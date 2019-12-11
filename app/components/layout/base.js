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
      'with-header': this.props.header
    });

    return (
      <div className={layoutClass}>
        { this.props.header && <Header>{this.props.header}</Header> }
        <div className={contentClass}>
          <div className="container">
            { this.props.children }
          </div>
        </div>
        <Footer dark={this.props.dark} rightComponent={this.props.footerRightComponent}/>
      </div>
    );
  }
}

export default BaseLayout;
