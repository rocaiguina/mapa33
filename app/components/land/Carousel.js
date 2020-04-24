import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { Button } from 'antd';
import Card from './Card';
import Empty from './Empty';
import Icon from '../ui/Icon';

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
    };
  }

  handleAfterChange = index => {
    this.setState({
      current: index + 1,
    });
  };

  handleOnPrev = () => {
    this.slider.slickPrev();
  };

  handleOnNext = () => {
    this.slider.slickNext();
  };

  render() {
    const lands = this.props.lands;

    if (lands && lands.length == 0) {
      return <Empty />;
    }

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
            centerPadding: '40px',
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            centerPadding: '30px',
          },
        },
        {
          breakpoint: 320,
          settings: {
            slidesToShow: 1,
            centerPadding: '60px',
          },
        },
      ],
    };
    return (
      <div className="slick-slider-maplist">
        <Slider
          ref={slider => (this.slider = slider)}
          afterChange={this.handleAfterChange}
          {...options}
        >
          {lands &&
            lands.map(land => (
              <Card
                key={land.id}
                id={land.id}
                name={land.name}
                photograph={land.photographURL}
                level={land.level}
                owner={land.owner}
                location={land.location}
                area_size={land.area_size}
                likes={land.likes}
              />
            ))}
        </Slider>
        <ul
          style={{ marginTop: '0' }}
          className="pager pager-justified"
        >
          <li className="previous">
            <Button shape="round" ghost onClick={this.handleOnPrev}>
              <Icon type="arrow-left-2" />
            </Button>
          </li>
          <li>
            {this.state.current}/{lands.length}
          </li>
          <li className="next">
            <Button shape="round" ghost onClick={this.handleOnNext}>
              <Icon type="arrow-right-2" />
            </Button>
          </li>
        </ul>
      </div>
    );
  }
}

Carousel.propTypes = {
  lands: PropTypes.array.isRequired,
};

export default Carousel;
