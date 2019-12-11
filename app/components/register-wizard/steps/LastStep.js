import React from 'react';
import { Col, Radio, Row, Checkbox } from 'antd';
import Button from '../../ui/Button';
import Icon from '../../ui/Icon';

class LastStep extends React.Component {

  handleOnChange = (event) => {
    this.props.wizard.next();
  }

  handleOnNext = (event) => {
    this.props.wizard.next();
  }

  handleOnPrevious = (event) => {
    this.props.wizard.previous();
  }

  render() {
    return (
      <div className="m-t-20">
        <br/>
        <br/>
        <br/>
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
        <br/>
        <br/>
        <br/>
        <Row>
            <Col xs={12}>
              <div className="text-left">
                <Button type="primary" onClick={this.handleOnPrevious}><Icon type="arrow-left-2"/></Button>
              </div>
            </Col>
            <Col xs={12}>
              <div className="text-right">
                <Button type="primary" onClick={this.handleOnNext}><Icon type="arrow-right-2"/></Button>
              </div>
            </Col>
        </Row>
        <br/>
        <br/>
        <br/>
      </div>
    );
  }
}

export default LastStep;
