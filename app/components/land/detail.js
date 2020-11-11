import React from 'react';
import { Button, Col, Divider, Icon, Row } from 'antd';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import Numeral from 'numeral';

import Badge from '../ui/Badge';
import Coordinates from '../ui/Coordinates';

import {
  LAND_ATTRIBUTE,
  LAND_MAIN_USE,
  LAND_PROPOSED_USE,
} from '../../constants';

class LandDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  setSubmitting = loading => {
    this.setState({ loading });
  };

  handleOnClickLike = () => {
    if (this.props.onClickLike) {
      this.setState({
        loading: true,
      });
      this.props.onClickLike({ id: this.props.id }, this.setSubmitting);
    }
  };

  render() {
    const photograph = this.props.photograph || '/images/no-land-image.jpg';
    let owner = '';
    if (this.props.owner != null) {
      owner = this.props.owner.first_name + ' ' + this.props.owner.last_name;
    }
    const landLikesClass = ClassNames('land-likes', {
      hidden: this.props.level == 'conserved',
    });

    const proposed_uses = this.props.proposed_uses || [];
    const main_attributes = this.props.main_attributes || [];
    const main_uses = this.props.main_uses || [];

    return (
      <div className="land-detail">
        <div className="m-b-20">
          <Row type="flex" gutter={16}>
            <Col md={6} style={{ display: 'flex', flexDirection: 'column' }}>
              <h2 className="land-title">{this.props.name}</h2>
              <h5 className="land-owner">{owner}</h5>
              <div className={landLikesClass + ' hidden-xs'}>
                <Icon type="heart" theme="filled" />
                {Numeral(this.props.likes).format('0,0')}
              </div>
              <div style={{ flex: '1 0 auto' }}></div>
              <div className="land-share hidden-xs">
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
              <div className="visible-xs">
                <Row gutter={12}>
                  <Col span={12}>
                    <div className={landLikesClass}>
                      <Icon type="heart" theme="filled" />
                      {Numeral(this.props.likes).format('0,0')}
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="land-share">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://www.facebook.com/sharer.php?u=${encodeURIComponent(
                          document.location.href
                        )}`}
                        className="ant-btn ant-btn-orange ant-btn-round ant-btn-lg ant-btn-block"
                      >
                        Compartir
                      </a>
                    </div>
                  </Col>
                </Row>
                <div className="land-support">
                  <Button
                    block
                    shape="round"
                    className="ant-btn-blue"
                    size="large"
                    disabled={
                      this.props.disabledLike || this.props.level == 'conserved'
                    }
                    loading={this.state.loading}
                    onClick={this.handleOnClickLike}
                  >
                    {this.props.level == 'conserved'
                      ? 'Conservado'
                      : this.props.disabledLike
                      ? 'Apoyado'
                      : 'Apoyar'}
                  </Button>
                </div>
              </div>
              <p className="land-reason-conservation">
                ¿Por qué es importante la protección de
                {this.props.plots_count > 1
                  ? ' estos terrenos '
                  : ' este terreno '}
                en particular?
              </p>
              <p style={{ flex: '1 0 auto' }}>
                {this.props.reason_conservation || 'No definido.'}
              </p>
              <div className="land-support hidden-xs">
                <Button
                  block
                  shape="round"
                  className="ant-btn-blue"
                  size="large"
                  disabled={
                    this.props.disabledLike || this.props.level == 'conserved'
                  }
                  loading={this.state.loading}
                  onClick={this.handleOnClickLike}
                >
                  {this.props.level == 'conserved'
                    ? 'Conservado'
                    : this.props.disabledLike
                    ? 'Apoyado'
                    : 'Apoyar'}
                </Button>
              </div>
            </Col>
          </Row>
        </div>

        <Divider dashed style={{ borderStyle: 'dotted' }} />

        <Row gutter={16}>
          <Col md={16}>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Row gutter={16}>
                  <Col xs={12} md={12}>
                    <Badge
                      title="Localizado"
                      description={this.props.location || 'No definido.'}
                      color="white"
                      shape="round"
                    />
                  </Col>
                  <Col xs={12} md={12}>
                    <Badge
                      title="Extensión"
                      description={
                        Numeral(this.props.area_size).format('0,0') + ' acres'
                      }
                      color="white"
                      shape="round"
                    />
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col xs={12} md={12}>
                    <Badge
                      title="Compuesto"
                      description={this.props.plots_count + ' parcelas'}
                      color="white"
                      shape="round"
                    />
                  </Col>
                  <Col xs={12} md={12}>
                    <Badge
                      title="Coordenadas"
                      description={
                        <Coordinates
                          point={this.props.coordinates.coordinates}
                        />
                      }
                      color="white"
                      shape="round"
                    />
                  </Col>
                </Row>
              </Col>
              <Col xs={24} md={12}>
                <Badge
                  title="Atributos principales del lugar"
                  description={
                    main_attributes.length > 0
                      ? main_attributes.map((item, index) => (
                          <div key={index}>
                            {item == 'others'
                              ? this.props.other_main_attributes
                              : LAND_ATTRIBUTE[item] || 'No definido'}
                          </div>
                        ))
                      : 'No definido.'
                  }
                  color="white"
                  shape="round"
                  style={{ minHeight: '140px' }}
                />
              </Col>
            </Row>
          </Col>
          <Col md={8}>
            <div className="land-features">
              <p>Usos principales actuales:</p>
              <ul>
                {main_uses.length == 0 && <li>No definido.</li>}
                {main_uses.map((item, index) => (
                  <li key={index} className="text-orange">
                    {item == 'others'
                      ? this.props.other_main_uses
                      : LAND_MAIN_USE[item] || 'No definido'}
                  </li>
                ))}
              </ul>
            </div>
            <div className="land-features">
              <p>Usos principales propuestos:</p>
              <ul>
                {proposed_uses.length == 0 && <li>No definido.</li>}
                {proposed_uses.map((item, index) => (
                  <li key={index} className="text-orange">
                    {LAND_PROPOSED_USE[item] || 'No definido'}
                  </li>
                ))}
              </ul>
            </div>
            <Button
              block
              shape="round"
              className="ant-btn-blue"
              size="large"
              onClick={this.props.onShareMemories}
            >
              Comparte tus memorias
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

LandDetail.defaultProps = {
  main_attributes: [],
  main_uses: [],
  proposed_uses: [],
};

LandDetail.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  level: PropTypes.string,
  photograph: PropTypes.string,
  owner: PropTypes.object,
  likes: PropTypes.number,
  reason_conservation: PropTypes.string,
  location: PropTypes.string,
  main_attributes: PropTypes.array,
  other_main_attributes: PropTypes.string,
  main_uses: PropTypes.array,
  other_main_uses: PropTypes.string,
  proposed_uses: PropTypes.array,
  area_size: PropTypes.number,
  plots_count: PropTypes.number,
  coordinates: PropTypes.object,
  onClickLike: PropTypes.func,
  disabledLike: PropTypes.bool,
  onShareMemories: PropTypes.func,
};

export default LandDetail;
