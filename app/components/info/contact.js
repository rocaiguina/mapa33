import React from 'react';
import { Col, Row } from 'antd';

class Contact extends React.Component {
  render() {
    return (
      <div className="contactstyle m-b-15">
        <Row>
          <Col md={16}>
            <div className="m-b-30">
              <h3>Para la Naturaleza</h3>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={10}>
            <div className="m-b-20">
              <p>Télefono: (787) 722-5882</p>
              <p>lunes - viernes de 9:00 a.m. a 5:30 p.m.</p>
              <p>Sábado: (787) 722-5834 x242</p>
              <p>
                Correo electrónico:{' '}
                <a
                  style={{ color: '#fff' }}
                  href="mailto:mapa33@paralanaturaleza.org"
                >
                  mapa33@paralanaturaleza.org
                </a>
              </p>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Contact;
