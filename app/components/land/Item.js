import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import ClassNames from 'classnames';
import Numeral from 'numeral';

class Item extends React.Component {
  render() {
    const badgeLevelClass = ClassNames('land-level', {
      'land-level-protected': this.props.level == 'conserved',
      'land-level-proposed': ['basic', 'pledge'].includes(this.props.level),
    });
    return (
      <tr>
        <td className="cell-fit">
          <span className={badgeLevelClass}></span>
        </td>
        <td>
          <h4>{this.props.name}</h4>
          Nombre de persona
        </td>
        <td>
          {this.props.location}
          <br />
          {Numeral(this.props.area_size).format('0,0')} cuerdas de extensión
        </td>
        <td>
          <span className="like-counter">
            <Icon type="heart" theme="filled" />
            {Numeral(1290).format('0,0')}
          </span>
        </td>
        <td className="align-middle text-center">
          <Link className="text-purple" to={`/land/${this.props.id}`}>
            <strong>Ver ficha</strong>
          </Link>
        </td>
      </tr>
    );
  }
}

Item.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  level: PropTypes.string,
  owner: PropTypes.string,
  location: PropTypes.string,
  area_size: PropTypes.number,
};

export default Item;
