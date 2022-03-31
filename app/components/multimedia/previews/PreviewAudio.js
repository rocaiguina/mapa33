import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

const PreviewSound = props => {
  const { src, title, round } = props;

  return (
    <div
      className={ClassNames({
        'memory-preview': true,
        'memory-preview-audio': true,
        'memory-preview-round': round,
      })}
    >
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
  round: false,
};

PreviewSound.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
  round: PropTypes.bool,
};

export default PreviewSound;
