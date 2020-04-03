import React from 'react';
import PropTypes from 'prop-types';
import Numeral from 'numeral';

class Coordinates extends React.Component {
  render() {
    let point = this.props.point || [];
    if (point.length < 2) {
      point = [0, 0];
    }
    return (
      <span>
        {Numeral(point[0]).format('0,0.00')}
        {','}
        {Numeral(point[1]).format('0,0.00')}
      </span>
    );
  }
}

Coordinates.defaultProps = {
  point: [0, 0],
};

Coordinates.propTypes = {
  point: PropTypes.array,
};

export default Coordinates;
