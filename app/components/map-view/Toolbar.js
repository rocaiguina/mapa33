import React from 'react';
import { Popover, Radio, Col, Row } from 'antd';
import Button from '../ui/Button';
import Icon from '../ui/Icon';

class MapToolBar extends React.Component {
  render () {
    const RadioMapView = (
      <Radio.Group onChange={this.props.onChangeModeView} value={this.props.mapView}
        size="large"
        className="popeditblack">
        <Row>
          <Radio value="list">Ver Lista</Radio>
        </Row>
        <Row>
          <Radio value="map">Ver Mapa</Radio>
        </Row>
      </Radio.Group>
    );

    const RadioAreaView = (
      <Radio.Group onChange={this.props.onChangeAreaView} value={this.props.areaView}
        className="popeditblack"
        size="large">
        <Row>
          <Radio value="proposed">Areas Naturales<br/>Propuestas</Radio>
        </Row>
        <Row>
          <Radio value="conserved">Areas Naturales<br/>Protegidas</Radio>
        </Row>
      </Radio.Group>
    );

    return (
      <div className="toolbar toolbar-menu">
        <ul>
          <li>
            <Button ghost><Icon type="menu" /></Button>
          </li>
          <li>
            <Button ghost><Icon type="user" /></Button>
          </li>
          <li>
            <Popover content={RadioMapView} trigger="click" className="m33-btn">
              <Button ghost><Icon type="eye" /></Button>
            </Popover>
          </li>
          <li>
            <Popover content={RadioAreaView} trigger="click" className="m33-btn">
              <Button ghost><Icon type="layers" /></Button>
            </Popover>
          </li>
        </ul>
      </div>
    );
  }
}

export default MapToolBar;
