import React from 'react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';

class Badge extends React.Component {
  render() {
    const badgeClass = ClassNames('badge', {
      'badge-white': this.props.color == 'white',
      'badge-round': this.props.shape == 'round',
    });

    return (
      <div className={badgeClass} {...this.props}>
        <h5>{this.props.title}</h5>
        {this.props.description}
      </div>
    );
  }
}

Badge.propTypes = {
  title: PropTypes.string,
  description: PropTypes.node,
  color: PropTypes.string,
  shape: PropTypes.string,
};

export default Badge;
