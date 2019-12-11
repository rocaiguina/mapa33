import React from 'react';
import { Col, Radio, Row, Input} from 'antd';
import Button from '../../ui/Button';
import Icon from '../../ui/Icon';

class PhoneOwnerStep extends React.Component {

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
          <Col md={8}/>
          <Col md={8} style={{paddingLeft:"20px"}}>
              <h1>¿Telefono del due&ntilde;o (si tiene) (nombre completo) </h1>
          </Col>
        </Row>
        <br/>
        <br/>
        <br/>
        <Row>
          <Col md={8}/>
          <Col id="propcol1" md={8} >
              <Input className="inputprop" size="large" placeholder="T:"/>
              <Input.TextArea className="inputprop" placeholder="N:"/>
          </Col>
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

export default PhoneOwnerStep;
