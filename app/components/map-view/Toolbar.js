import React from 'react';
import { Popover, Radio, Col, Row } from 'antd';
import Button from '../ui/Button';
import Icon from '../ui/Icon';

class MapToolBar extends React.Component {
  render () {
    const RadioMapView = (
      <Radio.Group onChange={this.props.onChangeMapView} value={this.props.mapView}
        size="large"
        className="popeditblack">
        <Row>
          <Radio value="list">List View</Radio>
        </Row>
        <Row>
          <Radio value="map">Map View</Radio>
        </Row>
      </Radio.Group>
    );

    const RadioAreaView = (
      <Radio.Group onChange={this.props.onChangeAreaView} value={this.props.areaView}
        className="popeditblack"
        size="large">
        <Row>
          <Radio value="lots">Areas Naturales Propuestas</Radio>
        </Row>
        <Row>
          <Radio value="protected_areas">Areas Naturales Protegidas</Radio>
        </Row>
      </Radio.Group>
    );

    return (
      <div className="toolbar toolbar-menu">
        <ul>
          <li>
            <Button size="large" ghost><Icon type="menu" /></Button>
          </li>
          <li>
            <Button size="large" ghost><Icon type="user" /></Button>
          </li>
          <li>
            <Popover content={RadioMapView} trigger="click" className="m33-btn">
              <Button size="large" ghost><Icon type="eye" /></Button>
            </Popover>
          </li>
          <li>
            <Popover content={RadioAreaView} trigger="click" className="m33-btn">
              <Button size="large" ghost><Icon type="layers" /></Button>
            </Popover>
          </li>
        </ul>
      </div>
    );
  }
}

export default MapToolBar;
