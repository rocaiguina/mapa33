import React from 'react';
import { Col, Row } from 'antd';
import Button from '../../ui/Button';

class LastStep extends React.Component {

  handleOnChange = (event) => {
    this.props.wizard.next();
  }

  render() {
    return (
      <div className="m-t-20">
        <Row>
          <Col md={4}/>
          <Col md={8} style={{paddingLeft:"20px"}}>
              <h3>Gracias, estaremos evaluando tu propuesta.</h3>
              <h3>Recibiras confirmaci&oacute;n por correo electr&oacute;nico cuando este aprobada tu selecci&oacute;n.</h3>
              <h3>De tener alguna duda con su selecci&oacute;n para la Naturaleza se comunicar&aacute; con usted.</h3>
          </Col>
          <Col md={8} style={{textAlign:"center", marginTop:"20px"}}>
              <Button className="inputprop radiobutton buttonok" onClick={() => this.handleOnClose()}>VOLVER AL MAPA</Button>
          </Col>
          <Col md={4}/>
        </Row>
      </div>
    );
  }
}

export default LastStep;
