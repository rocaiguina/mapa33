import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Footer from './footer';

class BaseLayout extends Component {
  render () {
    return (
      <div>
        <Header />
        <div>
          { props.children }
        </div>
        <Footer />
      </div>
    );
  }
}

BaseLayout.propTypes = {
  children: PropTypes.element.isRequired
};

export default BaseLayout;
