import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon } from 'antd';
import { Link } from 'react-router-dom';
import ClassNames from 'classnames';
import Numeral from 'numeral';

const { Meta } = Card;

class LandCard extends React.Component {
  render() {
    const landCardClassName = ClassNames('land-card', {
      'land-protected': this.props.level == 'conserved',
      'land-proposed': ['basic', 'pledge'].includes(this.props.level),
    });
    return (
      <Card
        className={landCardClassName}
        bordered={false}
        cover={
          <Link to={`/land/${this.props.id}`}>
            <img src="https://dummyimage.com/300x200/dddddd/ffffff" />
          </Link>
        }
        actions={[
          <div key="1" className="text-left">
            {this.props.level != 'conserved' && (
              <span>
                <Icon type="heart" key="heart" />{' '}
                {Numeral(this.props.likes).format('0,0')}
              </span>
            )}
          </div>,
          <div key="2" className="text-right">
            <Icon type="share-alt" key="share-alt" />
          </div>,
        ]}
      >
        <Link to={`/land/${this.props.id}`}>
          <Meta
            title={this.props.name}
            description={this.props.location || 'No definido'}
          />
        </Link>
      </Card>
    );
  }
}

LandCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  level: PropTypes.string,
  owner: PropTypes.string,
  location: PropTypes.string,
  likes: PropTypes.number,
};

export default LandCard;
