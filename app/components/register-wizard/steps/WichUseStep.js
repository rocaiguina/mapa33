import React from 'react';
import { Col, Row, Input } from 'antd';
import Pager from '../../ui/Pager';

class WichUseStep extends React.Component {

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
              <h1>¿Cu&aacute;l uso le dar&iacute;as al terreno?</h1>
              <h1>Explica brevemente</h1>
          </Col>
          <Col md={8} >
            <Input.TextArea className="inputprop" placeholder=""/>
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

export default WichUseStep;
