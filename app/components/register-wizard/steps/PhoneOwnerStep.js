import React from 'react';
import { Col, Row, Input} from 'antd';
import Pager from '../../ui/Pager';

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
        <Row>
          <Col md={8}/>
          <Col md={8} style={{paddingLeft:"20px"}}>
              <h1>¿Telefono del due&ntilde;o (si tiene) (nombre completo) </h1>
          </Col>
        </Row>
        <Row>
          <Col md={8}/>
          <Col id="propcol1" md={8} >
              <Input className="inputprop" size="large" placeholder="T:"/>
              <Input.TextArea className="inputprop" placeholder="N:"/>
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

export default PhoneOwnerStep;
