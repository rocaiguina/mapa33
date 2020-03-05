import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';

class Item extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.level}</td>
        <td>
          <h5>{this.props.name}</h5>
          {this.props.owner}
        </td>
        <td>
          {this.props.location}
          <br />
          {this.props.area_size} cuerdas de extensión
        </td>
        <td>
          <Icon type="heart" theme="filled" /> 1,290
        </td>
        <td>
          <Link to={`/land/${this.props.id}`}>Ver ficha</Link>
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
