import React from 'react';
import { Col, Radio, Row } from 'antd';
import MiniMap from '../../map-view/MiniMap';
import Button from '../../ui/Button';

class SubmitStep extends React.Component {
  render() {
    const { formik } = this.props;
    return (
      <div className="m-t-20">
        <Row>
          <Col md={5}/>
          <Col md={14} style={{textAlign:"center"}}>
            <MiniMap data={formik.values.geojson}/>
            <p className="text-center">Prevista</p>
          </Col>
        </Row>
        <Row>
          <Col md={8}/>
          <Col md={8} style={{textAlign:"center"}}>
              <Button htmlType="submit" className="inputprop buttonok" block>SOMETE</Button>
          </Col>
          <Col md={8}/>
        </Row>
      </div>
    );
  }
}

export default SubmitStep;
