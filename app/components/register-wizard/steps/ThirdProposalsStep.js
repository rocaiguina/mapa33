import React from 'react';
import { Col, Radio, Row } from 'antd';
import Button from '../../ui/Button';
import Icon from '../../ui/Icon';

class ThirdProposalsStep extends React.Component {

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
                ¿Tercer grupo de propuestas?
              </h1>
          </Col>
          <Col md={8} style={{textAlign:"left"}}>
              <Radio.Group defaultValue="Si">
                <div style={{display:"flex"}}>
                  <Radio className="blockstyleradio" value="Si"></Radio>
                  <div><h3>Grupos de vecinos#5.<br/>Proponemos preservar utop&iacute;a como un santuario natural cerrado al p&uacute;blico para conservar sus cualidades an&iacute;micas y conexi&oacute;n con el planeta.</h3></div>
                </div>
                <div style={{display:"flex", marginTop:"30px"}}>
                  <Radio className="blockstyleradio" value="No"></Radio>
                  <div><h3>Grupos de vecinos#6.<br/>Proponemos que utop&iacute;a se mantenga abierta para el beneficio uso y disfrute econ&oacute;mico, social y cultural de toda la comunidad.</h3></div>
                </div>
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

export default ThirdProposalsStep;
