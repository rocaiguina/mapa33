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
          <Col md={8}>
            <div className="m-b-20">
              <h4>Oficina Central</h4>
              <p>(787) 722-5834</p>
              <p>info@paralanaturaleza.org</p>
              <p>Lunes – Viernes 9:00am a 5:30pm</p>
            </div>
            <div className="m-b-20">
              <h4>Reservaciones</h4>
              <p>(787) 722-5882</p>
              <p>Lunes – Viernes 9:00am a 5:30pm</p>
              <p>Sábado: (787) 722-5834 x242</p>
              <p>Reservaciones en línea</p>
              <p>reservaciones@paralanaturaleza.org</p>
            </div>
          </Col>
          <Col md={8}>
            <div className="m-b-20">
              <h4>AMIGOS Para la Naturaleza</h4>
              <p>(787) 722-5844</p>
              <p>Lunes – Viernes 9:00am a 5:30pm</p>
              <p>Membresías en línea</p>
              <p>amigos@paralanaturaleza.org</p>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Contact;
