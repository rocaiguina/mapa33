import React from 'react';
import { Col, Radio, Row } from 'antd';
import Button from '../../ui/Button';
import Icon from '../../ui/Icon';

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
        <br/>
        <br/>
        <br/>
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

export default OwnerSuccessionStep;
