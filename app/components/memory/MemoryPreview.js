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
    <div>
      <Row>
        <Col md={12}>
          <h2>ESTA ES TU MEMORIA DE EL TERRENO DEL FUTURO</h2>
        </Col>
        <Col md={12}>
          {<MultimediaPreview multimedia={multimedia} />}
          <h2>{title}</h2>
          <p>{description}</p>
          <Row>
            <Col xs={12}>
              <span>{author}</span>
            </Col>
            <Col xs={12}>
              <span>{createdAt}</span>
            </Col>
          </Row>
          <Divider />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <p>Disclaimer legal de que será reviewed. Lorem ipsum</p>
        </Col>
        <Col md={12}>
          <p>Si todo está correcto, somete tu memoria</p>
          <Button block shape="round" onClick={onSubmit}>
            Someter memoria
          </Button>
          <Button block type="link" onClick={onMakeChanges}>
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
