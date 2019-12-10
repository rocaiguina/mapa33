import React from 'react';
import { Col, Row } from 'antd';
import Button from '../ui/Button';
import Icon from '../ui/Icon';

export default (props) => {
  return (
    <div className="intro">
      <div className="intro-img">
        <div className="intro-close">
          <Button type="primary" ghost size="large" onClick={props.onClose}>
            <Icon type="close" />
          </Button>
        </div>
        <Row>
          <Col md={{ span: 12, offset: 6 }}>
            <img className="img-responsive" src="/images/land.png"/>
          </Col>
        </Row>
      </div>
    </div>
  );
}