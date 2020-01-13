import React from 'react';
import { Col, Icon, Row } from 'antd';
import numeral from 'numeral';
import { DiscussionEmbed } from 'disqus-react';

import Badge from '../ui/Badge';
import Button from '../ui/Button';

class LandDetail extends React.Component {
  render () {
    const area = numeral(this.props.area).format('0,0');
    const photograph = this.props.photograph || 'https://dummyimage.com/600x400/dddddd/ffffff';
    const disqusConfig = {
      url: 'https://mapa33.disqus.com',
      identifier: `land-${this.props.id}`,
      title: this.props.name,
    };
    return (
      <div className="land-detail">
        <div className="m-b-20">
          <Row type="flex" gutter={16}>
            <Col md={6} style={{ display: 'flex', flexDirection: 'column' }}>
              <h2>{this.props.name}</h2>
              <h5 style={{ flex: '1 0 auto' }}>{this.props.owner || 'No definido'}</h5>
              <Row gutter={16} className="hidden-xs">
                <Col xs={12}>
                  <a
                    target="_blank"
                    href={`https://www.facebook.com/sharer.php?u=${encodeURIComponent(document.location.href)}`}
                    className="ant-btn m33-btn m33-btn-orange ant-btn-xlg ant-btn-block"
                    style={{ fontSize: '14px', fontWeight: 'bold', lineHeight: '56px' }}
                  >
                    Compartir
                  </a>
                </Col>
                <Col xs={12}>
                  <Button
                    color="white"
                    block
                    xlg
                    style={{ lineHeight: '10px', borderRadius: '6px' }}
                  >
                    <span><Icon type="heart" theme="filled"/></span>
                    <small>10,999</small>
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col md={10}>
              <div className="land-picture">
                <img className="img-responsive" src={photograph}/>
              </div>
            </Col>
            <Col md={8} style={{ display: 'flex', flexDirection: 'column' }}>
              <p
                className="land-feature"
              >
                ¿Por qué es importante la protección de este terreno en particular?
              </p>
              <p
                className="lead"
                style={{ flex: '1 0 auto' }}
              >
                Es un lugar con rasgos naturales especiales (p.e. arboledas, mogotes, lagunas, cuevas).
              </p>
              <Row gutter={16} className="visible-xs m-b-20">
                <Col xs={12}>
                  <Button
                    color="orange"
                    block
                    xlg
                    style={{ fontSize: '14px', fontWeight: 'bold' }}
                  >
                    Compartir
                  </Button>
                </Col>
                <Col xs={12}>
                  <Button
                    color="white"
                    block
                    xlg
                    style={{ lineHeight: '10px', borderRadius: '6px' }}
                  >
                    <span><Icon type="heart" theme="filled"/></span>
                    <small>10,999</small>
                  </Button>
                </Col>
              </Row>
              <Button color="blue" block xxlg>Apoyar</Button>
            </Col>
          </Row>
        </div>
        <Row gutter={16}>
          <Col md={8}>
            <Row gutter={16}>
              <Col xs={12}>
                <p className="land-feature">El terreno se<br/>encuentra en:</p>
                <Badge
                  block
                  size="large"
                  color="pink"
                >
                  {this.props.location || 'No definido'}
                </Badge>
              </Col>
              <Col xs={12}>
                <p className="land-feature">Con una<br/>extensión de:</p>
                <Badge
                  block
                  size="large"
                  color="blue"
                  round
                  style={{ padding: '12px 18px 4px 18px' }}
                >
                  <span>{ area }</span><br/><small>m<sup>2</sup></small>
                </Badge>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={12}>
                <p
                  className="land-feature"
                  style={{ height: '56px', paddingTop: '20px' }}
                >
                  Compuesto<br/>por
                </p>
                <Badge
                  block
                  size="large"
                  color="green"
                  round
                  style={{ padding: '12px 18px 4px 18px' }}
                >
                  <span>{this.props.plots_count}</span><br/><small>parcelas</small>
                </Badge>
              </Col>
              <Col xs={12}>
                <p
                  className="land-feature"
                  style={{ height: '56px', paddingTop: '20px' }}
                >
                  Con las<br/>coordenadas:
                </p>
                <Badge
                  block
                  size="large"
                  color="orange"
                  style={{ padding: '12px 18px 4px 18px' }}
                >
                  <small>102N 94S</small><br/><small>45e 070</small>
                </Badge>
              </Col>
            </Row>
          </Col>
          <Col md={8}>
            <p className="land-feature"><br/>El estado actual es:</p>
            <Badge block size="large" color="green" round>Abandono</Badge>
            <p
              className="land-feature"
              style={{ height: '56px', paddingTop: '20px' }}
            >
              Y los atributos principales<br/>que resaltan del lugar son:
            </p>
            <Badge block size="large" color="blue" round>Naturales</Badge>
          </Col>
          <Col md={8}>
            <p className="land-feature">Sus usos principales<br/>propuestos son:</p>
            <Badge block size="large" color="orange" round>Educación</Badge>
            <Badge block size="large" color="pink" round>Recreacion</Badge>
            <Badge block size="large" color="green" round>Usos Sostenibles</Badge>
          </Col>
        </Row>
        <DiscussionEmbed
          shortname="mapa33"
          config={disqusConfig}
        />
      </div>
    );
  }
}

export default LandDetail;
