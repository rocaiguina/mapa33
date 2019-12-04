import React from 'react';
import { Button, Col, Popover, Radio, Row } from 'antd';

class MapToolBar extends React.Component {
  render () {
    const RadioMapView = (
      <Radio.Group onChange={this.props.onChangeMapView} value={this.props.mapView}>
        <Radio value="list">List View</Radio>
        <Radio value="map">Map View</Radio>
      </Radio.Group>
    );

    const RadioAreaView = (
      <Radio.Group onChange={this.props.onChangeAreaView} value={this.props.areaView}>
        <Radio value="proposed">Areas Naturales Propuestas</Radio>
        <Radio value="protected">Areas Naturales Protegidas</Radio>
      </Radio.Group>
    );

    return (
      <div>
        <Row>
          <Col md={12}>
            <Button><i className="m33-icon m33-icon-menu"></i></Button>
            <Button><i className="m33-icon m33-icon-user"></i></Button>
            <Popover content={RadioMapView} trigger="click">
              <Button><i className="m33-icon m33-icon-eye"></i></Button>
            </Popover>
            <Popover content={RadioAreaView} trigger="click">
              <Button><i className="m33-icon m33-icon-layers"></i></Button>
            </Popover>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MapToolBar;