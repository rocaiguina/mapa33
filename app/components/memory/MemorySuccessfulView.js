import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row } from 'antd';

const MemorySuccessfulView = props => {
  const { onOk } = props;
  return (
    <Row>
      <Col md={12} className="text-center">
        <br />
        <img src="/images/memory/icons-check-circle.svg" width="160" />
        <br />
      </Col>
      <Col md={12}>
        <div style={{ padding: '0 15px' }}>
          <br />
          <h2>TU MEMORIA FUE SOMETIDA DE MANERA EXITOSA</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="form-group">
            <Button
              block
              size="large"
              shape="round"
              onClick={onOk}
              className="ant-btn-purple"
            >
              Volver a la Tarjeta de Propuesta
            </Button>
          </div>
        </div>
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
