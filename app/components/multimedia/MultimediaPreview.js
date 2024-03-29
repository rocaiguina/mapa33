import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import PreviewImage from './previews/PreviewImage';
import PreviewVideo from './previews/PreviewVideo';
import PreviewAudio from './previews/PreviewAudio';
import PreviewOEmbed from './previews/PreviewOEmbed';

const PREVIEW_COMPONENTS = {
  image: PreviewImage,
  video: PreviewVideo,
  youtube: PreviewOEmbed,
  audio: PreviewAudio,
  spotify: PreviewOEmbed,
};

const MultimediaPreview = props => {
  const { multimedia, round } = props;
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
        return (
          <Component
            key={index}
            src={item.url}
            title={item.name}
            round={round}
          />
        );
      })}
    </Slider>
  );
};

MultimediaPreview.defaultProps = {
  multimedia: [],
  round: false,
};

MultimediaPreview.propTypes = {
  multimedia: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  round: PropTypes.bool,
};

export default MultimediaPreview;
