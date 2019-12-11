import React from 'react';
import { Col, Radio, Row } from 'antd';
import Pager from '../../ui/Pager';

class FirstProposalsStep extends React.Component {

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
                ¿Primeras dos propuestas?
              </h1>
          </Col>
          <Col md={8} style={{textAlign:"left"}}>
              <Radio.Group defaultValue="Si">
                <div style={{display:"flex"}}>
                  <Radio value="Si" className="blockstyleradio" ></Radio>
                  <div><h3>Grupos de vecinos#1.<br/>Proponemos que utop&iacute;a se mantenga cerrada al público con el fin de preservar sus cualidades y belleza natural.</h3></div>
                </div>
                <div style={{display:"flex", marginTop:"30px"}}>
                  <Radio value="No" className="blockstyleradio" ></Radio>
                  <div><h3>Grupos de vecinos#2.<br/>Proponemos que utop&iacute;a sea visitada por personas para fines de recreación y aprender sobre el medio ambiente.</h3></div>
                </div>
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

export default FirstProposalsStep;