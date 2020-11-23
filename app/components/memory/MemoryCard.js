import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { Card, Col, Row } from 'antd';
import PreviewImage from '../multimedia/previews/PreviewImage';
import PreviewVideo from '../multimedia/previews/PreviewVideo';
import PreviewYoutube from '../multimedia/previews/PreviewYoutube';
import PreviewAudio from '../multimedia/previews/PreviewAudio';
import PreviewSpotify from '../multimedia/previews/PreviewSpotify';

const PREVIEW_COMPONENTS = {
  image: PreviewImage,
  video: PreviewVideo,
  youtube: PreviewYoutube,
  audio: PreviewAudio,
  spotify: PreviewSpotify,
};

const MemoryCard = props => {
  const {
    id,
    title,
    description,
    createdAt,
    author,
    multimedias,
    onClick,
  } = props;

  const handleOnClick = useCallback(() => {
    if (onClick) {
      onClick({ id, title, description, createdAt, author, multimedias });
    }
  }, [onClick]);

  const renderMedia = useMemo(() => {
    if (multimedias && multimedias.length > 0) {
      let item = multimedias[0];
      let Component = PREVIEW_COMPONENTS[item.type];
      return <Component src={item.url} title={item.name} />;
    }
    return null;
  }, [multimedias]);

  return (
    <Card
      bordered={false}
      style={{ margin: '10px' }}
      onClick={handleOnClick}
      className="memory-card"
    >
      {renderMedia}
      <h2>{title}</h2>
      <p>{description}</p>
      <Row>
        <Col xs={12}>
          <span className="memory-preview-author">{author}</span>
        </Col>
        <Col xs={12} className="text-right">
          <span className="memory-preview-createdAt">
            {Moment(createdAt).format('DD/MM/YYYY')}
          </span>
        </Col>
      </Row>
    </Card>
  );
};

MemoryCard.defaultProps = {
  id: 0,
  title: '',
  description: '',
  createdAt: '',
  author: '',
  multimedias: [],
  onClick: () => {},
};

MemoryCard.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  createdAt: PropTypes.string,
  author: PropTypes.string,
  multimedias: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  onClick: PropTypes.func,
};

export default MemoryCard;
