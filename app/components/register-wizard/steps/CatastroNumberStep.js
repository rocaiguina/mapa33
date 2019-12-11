import React from 'react';
import { Col, Input, Row } from 'antd';

class CatastroNumberStep extends React.Component {
  render() {
    return (
      <br/>
      <br/>
      <br/>
      <div>
          <Row>
              <Col md={8}/>
              <Col md={8} style={{paddingLeft:"20px"}}>
                  <h1>¿Cuál es el número de catastro?</h1>
              </Col>
          </Row>
          <Row>
            <Col md={8}/>
            <Col id="propcol1" md={8} >
                <Input className="inputprop" size="large" placeholder="__/__/__/__"/>
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

export default CatastroNumberStep;
