import React from 'react';
import PropTypes from 'prop-types';
import { XMasonry, XBlock } from 'react-xmasonry';

import MemoryCard from './MemoryCard';

const MemoryList = props => {
  const { data, onMemoryClick } = props;
  return (
    <XMasonry>
      {data.map(item => (
        <XBlock
          key={item.id}
          width={
            item.media_type == 'video' || item.media_type == 'youtube' ? 2 : 1
          }
        >
          <MemoryCard
            id={item.id}
            title={item.title}
            description={item.description}
            createdAt={item.createdAt}
            author={item.user && item.user.full_name}
            multimedias={item.multimedias}
            onClick={onMemoryClick}
          />
        </XBlock>
      ))}
    </XMasonry>
  );
};

MemoryList.defaultProps = {
  data: [],
  onMemoryClick: () => {},
};

MemoryList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.string,
      createdAt: PropTypes.string,
      user: PropTypes.shape({
        full_name: PropTypes.string,
      }),
      media_type: PropTypes.string,
      multimedias: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          type: PropTypes.string,
          url: PropTypes.string,
        })
      ),
    })
  ),
  onMemoryClick: PropTypes.func,
};

export default MemoryList;
