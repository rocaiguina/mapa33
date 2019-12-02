import React, { Component } from 'react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';
import Footer from './footer';

class BaseLayout extends Component {
  render () {
    const layoutClass = ClassNames('main', {
      'main-dark': this.props.dark
    });

    return (
      <div className={layoutClass}>
        <div className="container">
          { this.props.children }
        </div>
        <Footer dark={this.props.dark}/>
      </div>
    );
  }
}

export default BaseLayout;
