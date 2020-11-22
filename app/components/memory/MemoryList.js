import React from 'react';
import PropTypes from 'prop-types';
import { XMasonry, XBlock } from 'react-xmasonry';

import MemoryCard from './MemoryCard';

const MemoryList = props => {
  const { data } = props;
  return (
    <XMasonry>
      {data.map((item) => (
        <XBlock
          key={item.id}
          width={item.multimediaType == 'video' || item.multimediaType == 'youtube' ? 2 : 1}
        >
          <MemoryCard
            id={item.id}
            title={item.title}
            description={item.description}
            date={item.date}
            author={item.author}
          />
        </XBlock>  
      ))}
    </XMasonry>
  );
};

MemoryList.defaultProps = {
  data: [],
};

MemoryList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
    author: PropTypes.string,
    multimediaType: PropTypes.string,
    multimedia: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.string,
        url: PropTypes.string,
      })
    ),
  })),
};

export default MemoryList;
