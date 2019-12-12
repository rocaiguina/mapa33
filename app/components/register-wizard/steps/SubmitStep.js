import React from 'react';
import { Col, Radio, Row } from 'antd';
import Button from '../../ui/Button';

class SubmitStep extends React.Component {
  render() {
    return (
      <div className="m-t-20">
        <Row>
          <Col md={4}/>
          <Col md={16} style={{textAlign:"center"}}>
              <Button htmlType="submit" className="inputprop buttonok">SOMETE</Button>
          </Col>
          <Col md={4}/>
        </Row>
      </div>
    );
  }
}

export default SubmitStep;
