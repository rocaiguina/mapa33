import React from 'react';
import PropTypes from 'prop-types';

const PreviewYoutube = props => {
  const { src, title } = props;
  return (
    <div className="memory-preview memory-preview-youtube">
      <div className="embed-responsive embed-responsive-16by9">
        <iframe src={src} />
      </div>
      <h6>{title}</h6>
    </div>
  );
};

PreviewYoutube.defaultProps = {
  src: '',
  title: '',
};

PreviewYoutube.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
};

export default PreviewYoutube;
