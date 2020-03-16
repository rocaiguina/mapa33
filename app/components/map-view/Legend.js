import React from 'react';
import { Col, Row } from 'antd';

function Legend() {
  return (
    <div className="map-legend">
      <Row>
        <Col lg={5} md={8} xs={12}>
          <dl>
            <dt>
              <span className="legend-protected"></span>
            </dt>
            <dd>
              <div className="hidden-xs">Areas Naturales</div>
              Protegidas
            </dd>
          </dl>
        </Col>
        <Col lg={5} md={8} xs={12}>
          <dl>
            <dt>
              <span className="legend-proposed"></span>
            </dt>
            <dd>
              <div className="hidden-xs">Areas Naturales</div>
              Propuestas
            </dd>
          </dl>
        </Col>
      </Row>
    </div>
  );
}

export default Legend;
