import React from 'react';
import PropTypes from 'prop-types';

const PreviewSpotify = props => {
  const { src, title } = props;
  return (
    <div className="memory-preview memory-preview-spotify">
      <div className="embed-responsive embed-responsive-16by9">
        <iframe src={src} />
      </div>
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
