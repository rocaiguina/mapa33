import React from 'react';
import PropTypes from 'prop-types';

const PreviewYoutube = props => {
  const { src, title } = props;
  return (
    <div>
      <iframe src={src} />
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
