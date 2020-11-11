import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Icon, Row } from 'antd';

const MemorySuccessfulView = props => {
  const { onOk } = props;
  return (
    <Row>
      <Col md={12}>
        <Icon type="check-circle" />
      </Col>
      <Col md={12}>
        <h2>TU MEMORIA FUE SOMETIDA DE MANERA EXITOSA</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <Button block shape="round" onClick={onOk}>
          Volver a la Tarjeta de Propuesta
        </Button>
      </Col>
    </Row>
  );
};

MemorySuccessfulView.defaultProps = {
  onOk: () => {},
};

MemorySuccessfulView.propTypes = {
  onOk: PropTypes.func,
};

export default MemorySuccessfulView;
