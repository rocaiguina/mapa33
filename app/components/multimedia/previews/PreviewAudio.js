import React from 'react';
import PropTypes from 'prop-types';

const PreviewSound = props => {
  const { src, title } = props;
  return (
    <div className="memory-preview memory-preview-video">
      <audio controls>
        <source src={src} />
      </audio>
      <h6>{title}</h6>
    </div>
  );
};

PreviewSound.defaultProps = {
  src: '',
  title: '',
};

PreviewSound.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
};

export default PreviewSound;
