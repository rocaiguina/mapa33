import React from 'react';
import { Col, Input, Row } from 'antd';
import Button from '../../ui/Button';

class RegisterStep extends React.Component {

  handleOnSubmit = (event) => {
    this.props.wizard.next();
  }

  render() {
    return (
      <div className="m-b-20">
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
          <br/>
          <br/>
          <br/>
          <Row>
              <Col lg={{ span: 6, offset: 9 }}>
                  <Button type="secondary" size="large" block onClick={this.handleOnSubmit}>Someter</Button>
              </Col>
          </Row>
      </div>
    );
  }
}

export default RegisterStep;