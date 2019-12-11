import React from 'react';
import { Col, Radio, Row, Checkbox } from 'antd';
import Button from '../../ui/Button';
import Icon from '../../ui/Icon';

class ImportanceOfKnowingStep extends React.Component {

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
                ¿Por qu&eacute; es importante saber que Utop&iacute;a existe?
              </h1>
          </Col>
          <Col md={8} style={{textAlign:"left"}}>
              <Radio.Group defaultValue="Si">
                <div style={{display:"flex"}}>
                  <Radio value="Si" className="blockstyleradio" ></Radio>
                  <div><h3>Es importante que sus recursos apoyan la supervivencia de la flora y fauna de ese lugar.</h3></div>
                </div>
                <div style={{display:"flex", marginTop:"30px"}}>
                  <Radio value="No" className="blockstyleradio" ></Radio>
                  <div><h3>Es importante saber que ese lugar proporciona aire fresco y agua limpia a mi comunidad.</h3></div>
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

export default ImportanceOfKnowingStep;
