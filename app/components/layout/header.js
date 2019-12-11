import React, { Component } from 'react';
import ClassNames from 'classnames';

class Header extends Component {
  render () {
    const headerClass = ClassNames('header', {
      'header-dark': this.props.dark
    });

    return (
      <header className={headerClass}>
        <div className="container">
          {this.props.children}
        </div>
      </header>
    );
  }
}

export default Header;
