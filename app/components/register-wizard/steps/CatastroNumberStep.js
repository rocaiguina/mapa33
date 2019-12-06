import React from 'react';
import { Col, Input, Row } from 'antd';

class CatastroNumberStep extends React.Component {
  render() {
    return (
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
      </div>
    );
  }
}

export default CatastroNumberStep;