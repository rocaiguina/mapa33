import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popover, Radio, Row } from 'antd';
import Icon from '../ui/Icon';

class MapToolBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const RadioMapView = (
      <Radio.Group
        onChange={this.props.onChangeMode}
        value={this.props.mode}
        size="large"
        className="popeditblack"
      >
        <Row>
          <Radio value="card">Ver Tarjetas</Radio>
        </Row>
        <Row>
          <Radio value="list">Ver Lista</Radio>
        </Row>
        <Row>
          <Radio value="map">Ver Mapa</Radio>
        </Row>
      </Radio.Group>
    );

    const RadioAreaView = (
      <Radio.Group
        onChange={this.props.onChangeArea}
        value={this.props.area}
        className="popeditblack"
        size="large"
      >
        <Row>
          <Radio value="">Todas</Radio>
        </Row>
        <Row>
          <Radio value="proposed">
            Áreas Naturales
            <br />
            Propuestas
          </Radio>
        </Row>
        <Row>
          <Radio value="conserved">
            Áreas Naturales
            <br />
            Protegidas
          </Radio>
        </Row>
      </Radio.Group>
    );

    return (
      <div className="toolbar toolbar-menu toolbar-right">
        <ul>
          <li>
            <Popover content={RadioMapView} trigger="click">
              <Button size="large" shape="round" className="ant-btn-dark" style={{ padding: '0 10px' }}>
                <Icon type="eye" style={{ fontSize: '32px', lineHeight: '44px' }}/>
              </Button>
            </Popover>
          </li>
          <li>
            <Popover content={RadioAreaView} trigger="click">
              <Button size="large" shape="round" className="ant-btn-dark" style={{ padding: '0 10px' }}>
                <Icon type="layers" style={{ fontSize: '32px', lineHeight: '44px' }}/>
              </Button>
            </Popover>
          </li>
        </ul>
      </div>
    );
  }
}

MapToolBar.propTypes = {
  mode: PropTypes.string,
  area: PropTypes.string,
  onChangeMode: PropTypes.func,
  onChangeArea: PropTypes.func,
};

export default MapToolBar;
