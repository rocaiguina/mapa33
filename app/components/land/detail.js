import React from 'react';
import { Button, Col, Divider, Icon, Row } from 'antd';
import PropTypes from 'prop-types';
import Numeral from 'numeral';

import Badge from '../ui/Badge';

class LandDetail extends React.Component {
  render() {
    const photograph =
      this.props.photograph || 'https://dummyimage.com/600x400/dddddd/ffffff';
    let owner = '';
    if (this.props.owner != null) {
      owner = this.props.owner.first_name + ' ' + this.props.owner.last_name;
    }
    return (
      <div className="land-detail">
        <div className="m-b-20">
          <Row type="flex" gutter={16}>
            <Col md={6} style={{ display: 'flex', flexDirection: 'column' }}>
              <h2 className="land-title">{this.props.name}</h2>
              <h5 className="land-owner">{owner}</h5>
              <div className="land-likes">
                <Icon type="heart" theme="filled" />
                {Numeral(this.props.likes).format('0,0')}
              </div>
              <div className="land-share">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.facebook.com/sharer.php?u=${encodeURIComponent(
                    document.location.href
                  )}`}
                  className="ant-btn ant-btn-orange ant-btn-round ant-btn-lg"
                >
                  Compartir
                </a>
              </div>
            </Col>
            <Col md={10}>
              <div className="land-picture">
                <img className="img-responsive" src={photograph} />
              </div>
            </Col>
            <Col md={8} style={{ display: 'flex', flexDirection: 'column' }}>
              <p className="land-reason-conservation">
                ¿Por qué es importante la protección de este terreno en
                particular?
              </p>
              <p style={{ flex: '1 0 auto' }}>
                Es un lugar con rasgos naturales especiales (p.e. arboledas,
                mogotes, lagunas, cuevas).
              </p>
              <div className="land-support">
                <Button
                  block
                  shape="round"
                  className="ant-btn-blue"
                  size="large"
                >
                  Apoyar
                </Button>
              </div>
            </Col>
          </Row>
        </div>

        <Divider dashed style={{ borderStyle: 'dotted' }} />

        <Row gutter={16}>
          <Col md={16}>
            <Row gutter={16}>
              <Col xs={12} md={6}>
                <Badge
                  title="Localizado"
                  description={this.props.location}
                  color="white"
                  shape="round"
                />
              </Col>
              <Col xs={12} md={6}>
                <Badge
                  title="Extensión"
                  description={
                    Numeral(this.props.area_size).format('0,0') + ' cuerdas'
                  }
                  color="white"
                  shape="round"
                />
              </Col>
              <Col xs={24} md={12}>
                <Badge
                  title="Estado actual del terreno"
                  description={this.props.status}
                  color="white"
                  shape="round"
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={12} md={6}>
                <Badge
                  title="Compuesto"
                  description={this.props.plots_count + ' parcelas'}
                  color="white"
                  shape="round"
                />
              </Col>
              <Col xs={12} md={6}>
                <Badge
                  title="Coordenadas"
                  description="102N 94S 45e 70o"
                  color="white"
                  shape="round"
                />
              </Col>
              <Col xs={24} md={12}>
                <Badge
                  title="Atributos principales del lugar"
                  description="Naturales"
                  color="white"
                  shape="round"
                />
              </Col>
            </Row>
          </Col>
          <Col md={8}>
            <div className="land-features">
              <p>Usos principales propuestos:</p>
              <ul>
                <li className="text-orange">Educacion</li>
                <li className="text-purple">Recreacion</li>
                <li className="text-gray">Usos Sostenibles</li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

LandDetail.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  photograph: PropTypes.string,
  owner: PropTypes.object,
  likes: PropTypes.number,
  reason_conservation: PropTypes.string,
  location: PropTypes.string,
  area_size: PropTypes.number,
  status: PropTypes.string,
  plots_count: PropTypes.number,
  coordinates: PropTypes.string,
  attributes: PropTypes.string,
};

export default LandDetail;
