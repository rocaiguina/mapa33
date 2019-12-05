import React from 'react';
import { Col, Popover, Radio, Row } from 'antd';
import Button from '../ui/Button';
import Icon from '../ui/Icon';

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
            <Button ghost><Icon type="menu" /></Button>
            <Button ghost><Icon type="user" /></Button>
            <Popover content={RadioMapView} trigger="click">
              <Button ghost><Icon type="eye" /></Button>
            </Popover>
            <Popover content={RadioAreaView} trigger="click">
              <Button ghost><Icon type="layers" /></Button>
            </Popover>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MapToolBar;