import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { Card, Col, Row } from 'antd';

const MemoryCard = props => {
  const { id, title, description, date, author, multimedia } = props;
  return (
    <Card bordered={false} style={{ margin: '10px' }}>
      <h2>{title}</h2>
      <p>{description}</p>
      <Row>
        <Col xs={12}>
          <span className="memory-preview-author">{author}</span>
        </Col>
        <Col xs={12} className="text-right">
          <span className="memory-preview-createdAt">{Moment(date).format('DD/MM/YYYY')}</span>
        </Col>
      </Row>
    </Card>
  );
};

MemoryCard.defaultProps = {
  id: 0,
  title: '',
  description: '',
  date: '',
  author: '',
  multimedia: [],
};

MemoryCard.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.string,
  author: PropTypes.string,
  multimedia: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
      url: PropTypes.string,
    })
  ),
};

export default MemoryCard;
