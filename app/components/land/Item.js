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
    
    let owner = '';
    if (this.props.owner != null) {
      owner = this.props.owner.first_name + ' ' + this.props.owner.last_name;
    }

    return (
      <tr>
        <td className="cell-fit">
          <span className={badgeLevelClass}></span>
        </td>
        <td>
          <h4>{this.props.name}</h4>
          {owner}
        </td>
        <td>
          {this.props.location}
          <br />
          {Numeral(this.props.area_size).format('0,0')} cuerdas de extensión
        </td>
        <td>
          <span className="like-counter">
            <Icon type="heart" theme="filled" />
            {Numeral(this.props.likes).format('0,0')}
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

Item.defaultProps = {
  area_size: 0,
  likes: 0,
  owner: {
    first_name: '',
    last_name: '',
  },
};

Item.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  level: PropTypes.string,
  owner: PropTypes.object,
  location: PropTypes.string,
  area_size: PropTypes.number,
  likes: PropTypes.number,
};

export default Item;
