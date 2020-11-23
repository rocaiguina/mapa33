import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { Card, Col, Row } from 'antd';

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

  return (
    <Card bordered={false} style={{ margin: '10px' }} onClick={handleOnClick}>
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
