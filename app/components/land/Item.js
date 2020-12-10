import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Icon } from 'antd';
import { Link } from 'react-router-dom';
import ClassNames from 'classnames';
import Numeral from 'numeral';

class Item extends React.Component {
  handleOnLike = event => {
    event.preventDefault();
    const { id, onLike } = this.props;
    onLike(id);
  };
  
  render() {
    let owner = '';
    if (this.props.owner != null) {
      owner = this.props.owner.first_name + ' ' + this.props.owner.last_name;
    }
    const { landShape } = this.props;

    return (
      <div className="land-list-row">
        <div className="media">
          <div className="media-left">
            <img src={landShape || '/images/no-land-image.jpg'} width="50" />
          </div>
          <div className="media-body">
            <Row>
              <Col xs={24} md={12}>
                <h4 className="land-name">
                  <Link to={`/land/${this.props.id}`}>{this.props.name}</Link>
                </h4>
                <span className="hidden-xs">{owner}</span>
              </Col>
              <Col xs={24} md={6}>
                <span className="hidden-xs">
                  {this.props.location || 'No definido'}
                  <br />
                </span>
                <span>
                  {Numeral(this.props.area_size).format('0,0')} cuerdas de
                  extensión
                </span>
              </Col>
              <Col xs={12} md={3}>
                {this.props.level != 'conserved' && (
                  <a href="#" className="like-counter" onClick={this.handleOnLike}>
                    <Icon type="heart" theme="filled" />
                    {Numeral(this.props.likes).format('0,0')}
                  </a>
                )}
              </Col>
              <Col xs={12} md={3} className="text-right">
                <Link
                  className="ant-btn-link ant-btn-lg ant-btn-purple"
                  to={`/land/${this.props.id}`}
                >
                  <strong>Ver ficha</strong>
                </Link>
              </Col>
            </Row>
          </div>
        </div>
      </div>
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
  onLike: () => {},
};

Item.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  level: PropTypes.string,
  owner: PropTypes.object,
  location: PropTypes.string,
  area_size: PropTypes.number,
  likes: PropTypes.number,
  onLike: PropTypes.func,
};

export default Item;
