import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

const PreviewImage = props => {
  const { src, title, round } = props;
  return (
    <div
      className={ClassNames({
        'memory-preview': true,
        'memory-preview-image': true,
        'memory-preview-round': round,
      })}
    >
      <img src={src} alt={title} className="img-responsive" />
    </div>
  );
};

PreviewImage.defaultProps = {
  src: '',
  title: '',
  round: false,
};

PreviewImage.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
  round: PropTypes.bool,
};

export default PreviewImage;
