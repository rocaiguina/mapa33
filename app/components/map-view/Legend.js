import React from 'react';
import { Col, Row } from 'antd';

export default (props) => {
  return (
    <div className="map-legend">
      <Row>
        <Col lg={5} md={8} xs={12}>
          <dl>
            <dt><span className="legend-protected"></span></dt>
            <dd>Areas Naturales<br/>Protegidas</dd>
          </dl>
        </Col>
        <Col lg={5} md={8} xs={12}>
          <dl>
            <dt><span className="legend-proposed"></span></dt>
            <dd>Areas Naturales<br/>Propuestas</dd>
          </dl>
        </Col>
      </Row>
    </div>
  );
}