import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon } from 'antd';
import { Link } from 'react-router-dom';
import ClassNames from 'classnames';
import Numeral from 'numeral';

const { Meta } = Card;

class LandCard extends React.Component {
  handleOnLike = () => {
    const { id, onLike } = this.props;
    onLike(id);
  };

  handleOnShare = () => {
    const { id, onShare } = this.props;
    onShare(id);
  };

  render() {
    const { id, name, level, location, likes, photograph } = this.props;
    const landCardClassName = ClassNames('land-card', {
      'land-protected': level == 'conserved',
      'land-proposed': ['basic', 'pledge'].includes(level),
    });
    return (
      <Card
        className={landCardClassName}
        bordered={false}
        cover={
          <Link to={`/land/${id}`}>
            <img src={photograph || '/images/no-land-image.jpg'} />
          </Link>
        }
        actions={[
          <div key="1" className="text-left">
            {level != 'conserved' && (
              <span onClick={this.handleOnLike}>
                <Icon type="heart" key="heart" />
                <span className="m-l-5">{Numeral(likes).format('0,0')}</span>
              </span>
            )}
          </div>,
          <div key="2" className="text-right">
            <Icon
              type="share-alt"
              key="share-alt"
              onClick={this.handleOnShare}
            />
          </div>,
        ]}
      >
        <Link to={`/land/${id}`}>
          <Meta title={name} description={location || 'No definido'} />
        </Link>
      </Card>
    );
  }
}

LandCard.defaultProps = {
  id: 0,
  name: '',
  photograph: '',
  level: '',
  location: '',
  likes: 0,
  onLike: () => {},
  onShare: () => {},
};

LandCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  photograph: PropTypes.string,
  level: PropTypes.string,
  location: PropTypes.string,
  likes: PropTypes.number,
  onLike: PropTypes.func,
  onShare: PropTypes.func,
};

export default LandCard;
