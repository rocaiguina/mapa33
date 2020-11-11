import React from 'react';
import PropTypes from 'prop-types';

const PreviewSpotify = props => {
  const { src, title } = props;
  return (
    <div>
      <iframe src={src} />
      <h6>{title}</h6>
    </div>
  );
};

PreviewSpotify.defaultProps = {
  src: '',
  title: '',
};

PreviewSpotify.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
};

export default PreviewSpotify;
