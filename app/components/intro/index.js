import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import Video from './video';
import Welcome from './welcome';

class Intro extends React.Component {
  componentDidMount() {
    let self = this;
    setTimeout(function() {
      self.slider.slickNext();
    }, 2000);
  }

  goNextSlide = () => {
    this.slider.slickNext();
  };

  render() {
    const options = {
      infinite: false,
      dots: false,
      arrows: false,
      swipe: false,
      swipeToSlide: false,
      touchMove: false,
    };

    return (
      <Slider ref={slider => (this.slider = slider)} {...options}>
        <div>
          <Welcome />
        </div>
        <div>
          <Video
            videoId="HNK6EyNCWrg"
            onEnd={this.props.onEnd}
            onSkip={this.props.onEnd}
          />
        </div>
      </Slider>
    );
  }
}

Intro.propTypes = {
  onEnd: PropTypes.func,
};

export default Intro;
