import React from 'react';
import Slider from 'react-slick';
import Video from './video';
import Welcome from './welcome';
import Land from './lands';

class Intro extends React.Component {

  componentDidMount () {
    let self = this;
    setTimeout(function () {
      self.slider.slickNext();
    }, 2000);
  }

  goNextSlide = () => {
    this.slider.slickNext();
  }

  render () {
    const options = {
      infinite: false,
      dots: false,
      arrows: false,
      swipe: false,
      swipeToSlide: false,
      touchMove: false
    };

    return (
      <Slider ref={slider => (this.slider = slider)} {...options}>
        <div>
          <Welcome />
        </div>
        <div>
          <Video videoId="HNK6EyNCWrg"
            onEnd={this.goNextSlide}
            onSkip={this.goNextSlide}/>
        </div>
        <div>
          <Land onClose={this.props.onEnd}/>
        </div>

      </Slider>
    );
  }
}

export default Intro;