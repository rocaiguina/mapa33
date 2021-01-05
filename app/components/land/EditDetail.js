import React from 'react';
import { Button, Col, Divider, Icon, Row } from 'antd';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import Numeral from 'numeral';

import Coordinates from '../ui/Coordinates';

import { LAND_ATTRIBUTE, LAND_PROTECTION_REASON } from '../../constants';

class LandEditDetail extends React.Component {
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

    const main_attributes = this.props.main_attributes || [];
    const proposed_uses = this.props.proposed_uses || [];

    const reasonConservation = LAND_PROTECTION_REASON[
      this.props.reason_conservation
    ]
      ? LAND_PROTECTION_REASON[this.props.reason_conservation]
      : 'No definido.';

    return (
      <div className="land-detail">
        <div className="m-b-20">
          <Row type="flex" gutter={16}>
            <Col md={6} style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="land-edit-field">
                <h2 className="land-title">{this.props.name}</h2>
                <a href="#" className="land-edit-btn land-edit-btn-left">
                  <Icon type="edit" theme="filled" style={{ color: '#000' }} />
                </a>
              </div>
              <h5 className="land-owner">{owner}</h5>
              <div className={landLikesClass + ' hidden-xs'}>
                <Icon type="heart" theme="filled" style={{ color: '#fff' }} />
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
                  <span className="text-bold text-18">Compartir</span>
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
                        <span className="text-bold text-18">Compartir</span>
                      </a>
                    </div>
                  </Col>
                </Row>
                <div className="land-support">
                  <Button
                    block
                    shape="round"
                    className="ant-btn-purple"
                    size="large"
                    disabled={
                      this.props.disabledLike || this.props.level == 'conserved'
                    }
                    loading={this.state.loading}
                    onClick={this.handleOnClickLike}
                  >
                    <span className="text-bold text-18 text-black">
                      {this.props.level == 'conserved'
                        ? 'Conservado'
                        : this.props.disabledLike
                        ? 'Apoyado'
                        : 'Apoyar'}
                    </span>
                    {this.props.level != 'conserved' &&
                      !this.props.disabledLike && (
                        <Icon
                          type="heart"
                          theme="filled"
                          style={{
                            fontSize: '24px',
                            verticalAlign: 'middle',
                            marginLeft: '24px',
                          }}
                        />
                      )}
                  </Button>
                </div>
              </div>
              <div
                className="land-edit-field"
                style={{
                  display: 'flex',
                  flex: '1 0 auto',
                  marginBottom: '20px',
                }}
              >
                <div
                  className="land-reason-conservation"
                  style={{
                    flex: '1',
                    marginBottom: '0',
                  }}
                >
                  <h3>
                    ¿Por qué es importante la protección de
                    {this.props.plots_count > 1
                      ? ' estos terrenos '
                      : ' este terreno '}
                    en particular?
                  </h3>
                  <p>{reasonConservation}</p>
                </div>
                <a href="#" className="land-edit-btn land-edit-btn-right">
                  <Icon type="edit" theme="filled" style={{ color: '#000' }} />
                </a>
              </div>
              <div className="land-support hidden-xs">
                <Button
                  block
                  shape="round"
                  className="ant-btn-purple"
                  size="large"
                  disabled={
                    this.props.disabledLike || this.props.level == 'conserved'
                  }
                  loading={this.state.loading}
                  onClick={this.handleOnClickLike}
                >
                  <span className="text-bold text-18 text-black">
                    {this.props.level == 'conserved'
                      ? 'Conservado'
                      : this.props.disabledLike
                      ? 'Apoyado'
                      : 'Apoyar'}
                  </span>
                  {this.props.level != 'conserved' && !this.props.disabledLike && (
                    <Icon
                      type="heart"
                      theme="filled"
                      style={{
                        fontSize: '24px',
                        verticalAlign: 'middle',
                        marginLeft: '24px',
                      }}
                    />
                  )}
                </Button>
              </div>
            </Col>
          </Row>
        </div>
        <Divider dashed style={{ borderStyle: 'dotted' }} />
        <h3 className="text-bold m-b-20">USOS PRINCIPALES PROPUESTOS</h3>
        <div className="land-edit-field">
          <Row gutter={48} className="seven-cols">
            <Col md={12} sm={12} xs={12}>
              <div className="land-proposal-use">
                <img
                  src={
                    proposed_uses.includes('scientist_research')
                      ? '/images/memory/icons-scientist-research.svg'
                      : '/images/memory/icons-scientist-research-disabled.svg'
                  }
                />
                <p>Investigación científica</p>
              </div>
            </Col>
            <Col md={12} sm={12} xs={12}>
              <div className="land-proposal-use">
                <img
                  src={
                    proposed_uses.includes('environment_monitoring')
                      ? '/images/memory/icons-environment-monitoring.svg'
                      : '/images/memory/icons-environment-monitoring-disabled.svg'
                  }
                />
                <p>
                  Monitoreo
                  <br />
                  ambiental
                </p>
              </div>
            </Col>
            <Col md={12} sm={12} xs={12}>
              <div className="land-proposal-use">
                <img
                  src={
                    proposed_uses.includes('spirit_uses')
                      ? '/images/memory/icons-spiritual-uses.svg'
                      : '/images/memory/icons-spiritual-uses-disabled.svg'
                  }
                />
                <p>
                  Usos
                  <br />
                  espirituales
                </p>
              </div>
            </Col>
            <Col md={12} sm={12} xs={12}>
              <div className="land-proposal-use">
                <img
                  src={
                    proposed_uses.includes('educational')
                      ? '/images/memory/icons-education.svg'
                      : '/images/memory/icons-education-disabled.svg'
                  }
                />
                <p>
                  Educación
                  <br />
                  &nbsp;
                </p>
              </div>
            </Col>
            <Col md={12} sm={12} xs={12}>
              <div className="land-proposal-use">
                <img
                  src={
                    proposed_uses.includes('recreation')
                      ? '/images/memory/icons-recreation.svg'
                      : '/images/memory/icons-recreation-disabled.svg'
                  }
                />
                <p>Recreación</p>
              </div>
            </Col>
            <Col md={12} sm={12} xs={12}>
              <div className="land-proposal-use">
                <img
                  src={
                    proposed_uses.includes('turism')
                      ? '/images/memory/icons-tourism.svg'
                      : '/images/memory/icons-tourism-disabled.svg'
                  }
                />
                <p>Turismo</p>
              </div>
            </Col>
            <Col md={12} sm={12} xs={12}>
              <div className="land-proposal-use">
                <img
                  src={
                    proposed_uses.includes('sustainable_uses')
                      ? '/images/memory/icons-sustainable-uses.svg'
                      : '/images/memory/icons-sustainable-uses-disabled.svg'
                  }
                />
                <p>
                  Usos
                  <br />
                  sostenibles
                </p>
              </div>
            </Col>
          </Row>
          <a href="#" className="land-edit-btn land-edit-btn-right">
            <Icon type="edit" theme="filled" style={{ color: '#000' }} />
          </a>
        </div>
        <Divider dashed style={{ borderStyle: 'dotted' }} />
        <h3 className="text-bold">FICHA TÉCNICA</h3>
        <Row gutter={16}>
          <Col md={3} xs={12}>
            <div className="land-data-sheet">
              <h4>Localizado:</h4>
              <p>{this.props.location || 'No definido.'}</p>
            </div>
          </Col>
          <Col md={3} xs={12}>
            <div className="land-data-sheet">
              <h4>Extensión:</h4>
              <p>{Numeral(this.props.area_size).format('0,0') + ' cuerdas'}</p>
            </div>
          </Col>
          <Col md={6}>
            <div className="land-edit-field">
              <div className="land-data-sheet">
                <h4>Estado actual del terreno:</h4>
                <p>Abandonado</p>
              </div>
              <a href="#" className="land-edit-btn land-edit-btn-right">
                <Icon type="edit" theme="filled" style={{ color: '#000' }} />
              </a>
            </div>
          </Col>
          <Col md={3} xs={12}>
            <div className="land-data-sheet">
              <h4>Compuesto:</h4>
              <p>{this.props.plots_count + ' parcelas'}</p>
            </div>
          </Col>
          <Col md={3} xs={12}>
            <div className="land-data-sheet">
              <h4>Coordenadas</h4>
              <p>
                <Coordinates point={this.props.coordinates.coordinates} />
              </p>
            </div>
          </Col>
          <Col md={6}>
            <div className="land-edit-field">
              <div className="land-data-sheet">
                <h4>Atributos principales del lugar:</h4>
                <p>
                  {main_attributes.length > 0
                    ? main_attributes.map((item, index) => (
                        <span key={index}>
                          {item == 'others'
                            ? this.props.other_main_attributes
                            : LAND_ATTRIBUTE[item] || 'No definido'}
                        </span>
                      ))
                    : 'No definido.'}
                </p>
              </div>
              <a href="#" className="land-edit-btn land-edit-btn-right">
                <Icon type="edit" theme="filled" style={{ color: '#000' }} />
              </a>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

LandEditDetail.defaultProps = {
  main_attributes: [],
  main_uses: [],
  proposed_uses: [],
};

LandEditDetail.propTypes = {
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
};

export default LandEditDetail;
