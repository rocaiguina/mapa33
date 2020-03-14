import React from 'react';
import { Popover, Radio, Col, Row } from 'antd';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import Menu from '../intro/Menu';

class MapToolBar extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            mostrar: false
        };
    }
    
    closeOverlay = (event) => {
        this.setState(
            {
                mostrar: false
            }
        )
    }    
    openOverlay = (event) => {
        this.setState(
            {
                mostrar: true
            }
        )
    }    
    
    userLogin = (event) => {
        window.location.href = '/user/login'; 
    }
    
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
          {this.state.mostrar ? ( 
          <div className={"overlaymenu"}>
            <div className={"buttonmenu"}>
                <Button type="primary" ghost size="large" onClick={this.userLogin} >
                    <Icon type="user" />
                </Button>
                <Button style={{marginLeft:"10px"}} type="primary" ghost size="large" onClick={this.closeOverlay}>
                    <Icon type="close" />
                </Button>
            </div>
            <Menu/>
            <div className={"menubottom"}>
                <div>
                <Button type="simplebtn2">Visitar página <Icon type="arrow-right" /></Button>
                <img src="/images/naturaleza.png" className="img-responsive" />
              </div>
            </div>
        </div>): null}
        <ul>
          <li>
            <Button ghost onClick={this.openOverlay} ><Icon type="menu" /></Button>
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
