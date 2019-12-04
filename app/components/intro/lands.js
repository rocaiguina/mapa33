import React from 'react';
import { Col, Row } from 'antd';
import Button from '../ui/Button';

export default (props) => {
  return (
    <div className="intro intro-img">
      <Row>
        <Col md={{ span: 12, offset: 6 }}>
          <div className="intro-close">
            <Button type="primary" ghost size="large" onClick={props.onClose}>
              <i className="m33-icon m33-icon-close"></i>
            </Button>
          </div>
          <img className="img-responsive" src="/images/land.png"/>
        </Col>
      </Row>
    </div>
  );
}