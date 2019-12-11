import React from 'react';
import { Col, Row, Input } from 'antd';
import Pager from '../../ui/Pager';

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
        <Pager
          onPrevious={this.handleOnPrevious}
          onNext={this.handleOnNext}
        />
      </div>
    );
  }
}

export default YesFillFormStep;
