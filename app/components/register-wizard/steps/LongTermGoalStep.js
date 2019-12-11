import React from 'react';
import { Col, Radio, Row, Checkbox } from 'antd';
import Button from '../../ui/Button';
import Icon from '../../ui/Icon';

class LongTermGoalStep extends React.Component {

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
          <Col md={8}>
            <h1>¿Cu&aacute;l es su meta a largo plazo con esta propiedad?</h1>
          </Col>
          <Col md={8}>
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                <Col span={24}>
                  <Checkbox value="A" className="inputprop radiobutton">Opción 1</Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="B" className="inputprop radiobutton">Opción 2</Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="C" className="inputprop radiobutton">Opción 3</Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="D" className="inputprop radiobutton">Opción 4</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Col>
          <Col md={4} />
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

export default LongTermGoalStep;
