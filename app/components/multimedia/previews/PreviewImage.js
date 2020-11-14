import React from 'react';
import PropTypes from 'prop-types';

const PreviewImage = props => {
  const { src, title } = props;
  return (
    <div className="memory-preview memory-preview-image">
      <img src={src} alt={title} className="img-responsive" />
    </div>
  );
};

PreviewImage.defaultProps = {
  src: '',
  title: '',
};

PreviewImage.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
};

export default PreviewImage;
