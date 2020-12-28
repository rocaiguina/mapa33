import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

const PreviewOEmbed = props => {
  const { src, round } = props;
  return (
    <div
      className={ClassNames({
        'memory-preview': true,
        'memory-preview-oembed': true,
        'memory-preview-round': round,
      })}
    >
      <div className="embed-responsive embed-responsive-16by9">
        <div dangerouslySetInnerHTML={{ __html: src }}></div>
      </div>
    </div>
  );
};

PreviewOEmbed.defaultProps = {
  src: '',
  round: false,
};

PreviewOEmbed.propTypes = {
  src: PropTypes.string,
  round: PropTypes.bool,
};

export default PreviewOEmbed;
