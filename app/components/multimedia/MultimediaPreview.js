import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import PreviewImage from './previews/PreviewImage';
import PreviewVideo from './previews/PreviewVideo';
import PreviewYoutube from './previews/PreviewYoutube';
import PreviewAudio from './previews/PreviewAudio';
import PreviewSpotify from './previews/PreviewSpotify';

const PREVIEW_COMPONENTS = {
  image: PreviewImage,
  video: PreviewVideo,
  youtube: PreviewYoutube,
  audio: PreviewAudio,
  spotify: PreviewSpotify,
};

const MultimediaPreview = props => {
  const { multimedia } = props;
  const sliderOptions = {
    infinite: false,
    dots: true,
    arrows: false,
    swipe: true,
    swipeToSlide: true,
    touchMove: true,
    className: 'slick-slide-memory',
  };

  return (
    <Slider {...sliderOptions}>
      {multimedia.map((item, index) => {
        const Component = PREVIEW_COMPONENTS[item.type];
        return <Component key={index} src={item.url} title={item.name} />;
      })}
    </Slider>
  );
};

MultimediaPreview.defaultProps = {
  multimedia: [],
};

MultimediaPreview.propTypes = {
  multimedia: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
      url: PropTypes.string,
    })
  ),
};

export default MultimediaPreview;
