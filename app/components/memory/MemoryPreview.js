import React from 'react';
import { Button, Col, Divider, Row } from 'antd';
import PropTypes from 'prop-types';

import MultimediaPreview from '../multimedia/MultimediaPreview';

const MemoryPreview = props => {
  const {
    title,
    description,
    createdAt,
    author,
    multimedia,
    onSubmit,
    onMakeChanges,
  } = props;

  return (
    <div className="memory-preview">
      <Row gutter={30}>
        <Col md={12}>
          <h2 className="memory-title">
            ESTA ES TU MEMORIA DE EL TERRENO DEL FUTURO
          </h2>
        </Col>
        <Col md={12}>
          <MultimediaPreview multimedia={multimedia} round />
          <h2 className="memory-preview-title">{title}</h2>
          <p className="memory-preview-description">{description}</p>
          <Row>
            <Col xs={12}>
              <span className="memory-preview-author">{author}</span>
            </Col>
            <Col xs={12} className="text-right">
              <span className="memory-preview-createdAt">{createdAt}</span>
            </Col>
          </Row>
          <Divider />
        </Col>
      </Row>
      <Row gutter={30}>
        <Col md={12}>
          <p>Disclaimer legal de que será reviewed. Lorem ipsum</p>
        </Col>
        <Col md={12}>
          <p className="text-black text-bold">
            Si todo está correcto, somete tu memoria
          </p>
          <Button
            block
            shape="round"
            onClick={onSubmit}
            size="large"
            className="ant-btn-purple"
          >
            Someter memoria
          </Button>
          <Button
            block
            type="link"
            onClick={onMakeChanges}
            size="large"
            className="ant-btn-gray"
          >
            Hacer cambios
          </Button>
        </Col>
      </Row>
    </div>
  );
};

MemoryPreview.defaultProps = {
  title: '',
  description: '',
  createdAt: '',
  author: '',
  multimedia: [],
  onSubmit: () => {},
  onMakeChanges: () => {},
};

MemoryPreview.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  createdAt: PropTypes.string,
  author: PropTypes.string,
  multimedia: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  onSubmit: PropTypes.func,
  onMakeChanges: PropTypes.func,
};

export default MemoryPreview;
