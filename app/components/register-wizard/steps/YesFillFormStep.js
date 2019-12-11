import React from 'react';
import { Col, Radio, Row, Input } from 'antd';
import Button from '../../ui/Button';
import Icon from '../../ui/Icon';

class YesFillFormStep extends React.Component {

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
              <h1>Si contesta (si) llene el formulario </h1>
          </Col>
          <Col id="propcol1" md={8} >
              <Input className="inputprop" size="large" placeholder="Nombre:"/>
              <Input className="inputprop" size="large" placeholder="Tel:"/>
              <Input className="inputprop" size="large" placeholder="@:"/>
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

export default YesFillFormStep;
