import React from 'react';
import { Col, Input, Row } from 'antd';
import Pager from '../../ui/Pager';

class CatastroNumberStep extends React.Component {
  
  handleOnNext = (event) => {
    this.props.wizard.next();
  }

  handleOnPrevious = (event) => {
    this.props.wizard.previous();
  }

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
          <Pager
            onPrevious={this.handleOnPrevious}
            onNext={this.handleOnNext}
          />
      </div>
    );
  }
}

export default CatastroNumberStep;
