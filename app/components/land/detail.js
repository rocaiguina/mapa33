import React from 'react';
import { Col, Icon, Row } from 'antd';

import Badge from '../ui/Badge';
import Button from '../ui/Button';

class LandDetail extends React.Component {
  render () {
    return (
      <div className="land-detail">
        <div className="m-b-20">
          <Row type="flex" gutter={16}>
            <Col md={6} style={{ display: 'flex', flexDirection: 'column' }}>
              <h2>El Terreno del futuro</h2>
              <h5 style={{ flex: '1 0 auto' }}>Junior Caño</h5>
              <Row gutter={16} className="hidden-xs">
                <Col xs={12}>
                  <Button color="orange" block xlg style={{ fontSize: '14px', fontWeight: 'bold' }}>Share</Button>
                </Col>
                <Col xs={12}>
                  <Button color="white" block xlg style={{ lineHeight: '10px', borderRadius: '6px' }}><span><Icon type="heart" theme="filled"/></span><small>10,999</small></Button>
                </Col>
              </Row>
            </Col>
            <Col md={10}>
              <div className="land-picture">
                <img src="https://dummyimage.com/600x400/dddddd/ffffff" className="img-responsive"/>
              </div>
            </Col>
            <Col md={8} style={{ display: 'flex', flexDirection: 'column' }}>
              <p className="land-feature">¿Por qué es importante la protección de este terreno en particular?</p>
              <p className="lead" style={{ flex: '1 0 auto' }}>Es un lugar con rasgos naturales especiales (p.e. arboledas, mogotes, lagunas, cuevas).</p>
              <Row gutter={16} className="visible-xs m-b-20">
                <Col xs={12}>
                  <Button color="orange" block xlg style={{ fontSize: '14px', fontWeight: 'bold' }}>Share</Button>
                </Col>
                <Col xs={12}>
                  <Button color="white" block xlg style={{ lineHeight: '10px', borderRadius: '6px' }}><span><Icon type="heart" theme="filled"/></span><small>10,999</small></Button>
                </Col>
              </Row>
              <Button color="blue" block xxlg>Support this</Button>
            </Col>
          </Row>
        </div>
        <Row gutter={16}>
          <Col md={8}>
            <Row gutter={16}>
              <Col xs={12}>
                <p className="land-feature">El terreno se<br/>encuentra en:</p>
                <Badge block size="large" color="pink">Fajardo</Badge>
              </Col>
              <Col xs={12}>
                <p className="land-feature">Con una<br/>extensión de:</p>
                <Badge block size="large" color="blue" round style={{ padding: '12px 18px 4px 18px' }}><span>1,000</span><br/><small>cuerdas</small></Badge>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={12}>
                <p className="land-feature" style={{ height: '56px', paddingTop: '20px' }}>Compuesto<br/>por</p>
                <Badge block size="large" color="green" round style={{ padding: '12px 18px 4px 18px' }}><span>2</span><br/><small>parcelas</small></Badge>
              </Col>
              <Col xs={12}>
                <p className="land-feature" style={{ height: '56px', paddingTop: '20px' }}>Con las<br/>coordenadas:</p>
                <Badge block size="large" color="orange" style={{ padding: '12px 18px 4px 18px' }}><small>102N 94S</small><br/><small>45e 070</small></Badge>
              </Col>
            </Row>
          </Col>
          <Col md={8}>
            <p className="land-feature"><br/>El estado actual es:</p>
            <Badge block size="large" color="green" round>Abandono</Badge>
            <p className="land-feature" style={{ height: '56px', paddingTop: '20px' }}>Y los atributos principales<br/>que resaltan del lugar son:</p>
            <Badge block size="large" color="blue" round>Naturales</Badge>
          </Col>
          <Col md={8}>
            <p className="land-feature">Sus usos principales<br/>propuestos son:</p>
            <Badge block size="large" color="orange" round>Educacion</Badge>
            <Badge block size="large" color="pink" round>Recreacion</Badge>
            <Badge block size="large" color="green" round>Usos Sostenibles</Badge>
          </Col>
        </Row>
      </div>
    );
  }
}

export default LandDetail;
