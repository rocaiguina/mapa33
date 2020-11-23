import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

const PreviewYoutube = props => {
  const { src, title, round } = props;
  return (
    <div
      className={ClassNames({
        'memory-preview': true,
        'memory-preview-youtube': true,
        'memory-preview-round': round,
      })}
    >
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
  round: false,
};

PreviewYoutube.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
  round: PropTypes.bool,
};

export default PreviewYoutube;
