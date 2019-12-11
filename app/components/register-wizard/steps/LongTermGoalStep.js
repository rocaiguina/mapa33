import React from 'react';
import { Col, Row, Checkbox } from 'antd';
import Pager from '../../ui/Pager';

class LongTermGoalStep extends React.Component {

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
        <Pager
          onPrevious={this.handleOnPrevious}
          onNext={this.handleOnNext}
        />
      </div>
    );
  }
}

export default LongTermGoalStep;
