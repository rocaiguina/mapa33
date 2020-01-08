import React from 'react';
import { Card, Icon } from 'antd';
import { Link } from 'react-router-dom';
import ClassNames from 'classnames';

const { Meta } = Card;

class LandCard extends React.Component {

  render () {
    return (
      <Card 
        className={ 
          ClassNames(
            'land-card',
            { 
              'land-protected': this.props.level == 'conserved',
              'land-proposed': this.props.level == 'basic' || this.props.level == 'pledge'
            }
          )
        }
        bordered={false}
        cover={
          <Link to={`/land/${this.props.id}`}>
            <img src="https://dummyimage.com/300x200/dddddd/ffffff"/>
          </Link>
        }
        actions={[
          <div className="text-left"><Icon type="heart" key="heart" /> 10,999</div>,
          <div className="text-right"><Icon type="share-alt" key="share-alt" /></div>
        ]}>
        <Link to={`/land/${this.props.id}`}>
          <Meta
            title={this.props.name}
            description={this.props.location}
          />
        </Link>
      </Card>
    );
  }
}

export default LandCard;