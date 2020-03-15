import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

class Header extends Component {
  render() {
    const headerClass = ClassNames('header', {
      'header-dark': this.props.dark,
    });

    return (
      <header className={headerClass}>
        <div className="container">
          <div className="page-title">
            <h2>{this.props.title}</h2>
            <ul className="actions">
              {this.props.actions.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div>{this.props.subtitle}</div>
        </div>
      </header>
    );
  }
}

Header.defaultProps = {
  actions: [],
};

Header.propTypes = {
  title: PropTypes.string,
  dark: PropTypes.bool,
  actions: PropTypes.array,
  subtitle: PropTypes.node,
};

export default Header;
