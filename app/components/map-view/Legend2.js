import React from 'react';
import { Col, Row } from 'antd';

function Legend2() {
  return (
    <Row>
      <Col md={18}>
        <div className="map-legend map-legend2">
          <div className="map-legend-text">
            LEYENDA <span className="hidden-xs">DE ÁREAS NATURALES</span>
          </div>
          <dl>
            <dt>
              <span className="legend-protected"></span>
            </dt>
            <dd>Protegidas</dd>
          </dl>
          <dl className="last">
            <dt>
              <span className="legend-proposed"></span>
            </dt>
            <dd>Propuestas</dd>
          </dl>
        </div>
      </Col>
    </Row>
  );
}

export default Legend2;
