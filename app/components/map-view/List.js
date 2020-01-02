import React from 'react';
import Slider from 'react-slick';
import { Card, Col, Row } from 'antd';
import ClassNames from 'classnames';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import LandCard from './LandCard';

const { Meta } = Card;

class ListView extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      current: 1
    };
  }

  handleAfterChange = (index) => {
    this.setState({
      current: index + 1
    });
  }

  handleOnPrev = (event) => {
    this.slider.slickPrev();
  }

  handleOnNext = (event) => {
    this.slider.slickNext();
  }

  render () {
    const options = {
      centerMode: true,
      infinite: true,
      arrows: false,
      slidesToShow: 3,
      centerPadding: '90px',
      responsive: [
        {
          breakpoint: 780,
          settings: {
            slidesToShow: 1,
            centerPadding: '40px'
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            centerPadding: '20px',
          }
        }
      ]
    };

    return (
      <div className="slick-slider-maplist">
        <Slider
          ref={slider => (this.slider = slider)}
          afterChange={this.handleAfterChange}
          {...options}>
          {
            this.props.items.map((item) => 
              <div key={item}>
                <LandCard 
                  id={item.id}
                  name={item.name}
                  level={item.level}
                  location={item.location}
                />
              </div>
              )
          }
        </Slider>
        <p className="slick-slider-paginator">{ this.state.current }/{this.props.items.length}</p>
        <div className="toolbar hidden-sm hidden-xs">
          <ul>
            <li>
              <Button size="large" ghost onClick={this.handleOnPrev}><Icon type="arrow-left-2"/></Button>
            </li>
            <li>
              <Button size="large" ghost onClick={this.handleOnNext}><Icon type="arrow-right-2"/></Button>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default ListView;