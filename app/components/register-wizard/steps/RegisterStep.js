import React from 'react';
import { Col, Input, Row } from 'antd';

class RegisterStep extends React.Component {
  render() {
    return (
      <div>
          <Row>
              <Col md={4}/>
              <Col md={8} style={{paddingLeft:"20px"}}>
                  <h1>Reg&iacute;strate: </h1>
              </Col>
          </Row>
          <Row>
          <Col md={4}/>
          <Col id="propcol1" md={8} >
              <Input className="inputprop" size="large" placeholder="Nombre:" />
              <Input className="inputprop" size="large" placeholder="Apellido:" />
              <Input className="inputprop" size="large" placeholder="Usuario:" />
          </Col>
          <Col id="propcol2" md={8} >
              <Input className="inputprop" size="large" placeholder="Password:" />
              <Input className="inputprop" size="large" placeholder="Email:" />
              <Input className="inputprop" size="large" placeholder="ZipCode:" />
          </Col>
          <Col md={4}/>
          </Row>
      </div>
    );
  }
}

export default RegisterStep;