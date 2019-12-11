import React from 'react';
import { Col, Radio, Row } from 'antd';
import Pager from '../../ui/Pager';

class YoulGoingStep extends React.Component {

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
          <Col md={8}>
            <h1>Vas a:</h1>
              <h2>a. Donar un terreno</h2>
              <h2>b. Proponer un terreno</h2>
              <h2>c. Apoyar una propuesta existente</h2>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col md={4}/>
          <Col md={16} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}}>
              <Radio.Group defaultValue="a" buttonStyle="solid">
                <Radio.Button className="inputprop radioprop radiosi form1 abcradio" value="a">a</Radio.Button>
                <Radio.Button className="inputprop radioprop radiosi form1 abcradio" value="b">b</Radio.Button>
                <Radio.Button className="inputprop radioprop radiosi form1 abcradio" value="c">c</Radio.Button>
              </Radio.Group>
          </Col>
          <Col md={4} />
        </Row>
        <Pager
          onPrevious={this.handleOnPrevious}
          onNext={this.handleOnNext}
        />
      </div>
    );
  }
}

export default YoulGoingStep;
