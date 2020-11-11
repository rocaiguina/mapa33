import React from 'react';
import PropTypes from 'prop-types';

const PreviewVideo = props => {
  const { src, title } = props;
  return (
    <div>
      <video controls>
        <source src={src} />
      </video>
      <h6>{title}</h6>
    </div>
  );
};

PreviewVideo.defaultProps = {
  src: '',
  title: '',
};

PreviewVideo.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
};

export default PreviewVideo;
