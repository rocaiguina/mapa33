import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

const PreviewVideo = props => {
  const { src, title, round } = props;
  return (
    <div
      className={ClassNames({
        'memory-preview': true,
        'memory-preview-video': true,
        'memory-preview-round': round,
      })}
    >
      <div className="embed-responsive embed-responsive-16by9">
        <video controls>
          <source src={src} />
        </video>
      </div>
      <h6>{title}</h6>
    </div>
  );
};

PreviewVideo.defaultProps = {
  src: '',
  title: '',
  round: false,
};

PreviewVideo.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
  round: PropTypes.bool,
};

export default PreviewVideo;
