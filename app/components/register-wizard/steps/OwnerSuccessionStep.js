import React from 'react';
import { Col, Radio, Row } from 'antd';
import Pager from '../../ui/Pager';

class OwnerSuccessionStep extends React.Component {

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
          <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}} >
              <h1>
                ¿El due&ntilde;o del terreno es una sucesi&oacute;n?
              </h1>
          </Col>
          <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}}>
            <Radio.Group defaultValue="Si" buttonStyle="solid">
              <Radio.Button className="inputprop radioprop radiosi form2" value="Si">Si</Radio.Button>
              <Radio.Button className="inputprop radioprop radiono form2" value="No">No</Radio.Button>
            </Radio.Group>
          </Col>
          <Col md={4}/>
        </Row>
        <br/>
        <br/>
        <Row>
          <Col md={4}/>
          <Col md={8} style={{textAlign:"center",marginLeft:"auto", marginRight:"auto"}}>
            <h1>¿Todos los miembros están de acuerdo?</h1>
          </Col>
          <Col md={8} style={{textAlign:"center",marginLeft:"auto", marginRight:"auto"}}>
            <Radio.Group defaultValue="Si" buttonStyle="solid">
              <Radio.Button className="inputprop radioprop radiosi form3" value="Si">Si</Radio.Button>
              <Radio.Button className="inputprop radioprop radiono form3" value="No">No</Radio.Button>
            </Radio.Group>
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

export default OwnerSuccessionStep;
