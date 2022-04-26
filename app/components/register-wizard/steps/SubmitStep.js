import React from 'react';
import PropTypes from 'prop-types';
import { Col, Divider, Row } from 'antd';
import Numeral from 'numeral';

import BaseLayout from '../../layout/base';
import Badge from '../../ui/Badge';
import Coordinates from '../../ui/Coordinates';
import BottomNavigator from '../BottomNavigator';
import TopNavigator from '../TopNavigator';
import Progress from '../Progress';
import {
  LAND_ATTRIBUTE,
  LAND_MAIN_USE,
  LAND_PROPOSED_USE,
} from '../../../constants';

class SubmitStep extends React.Component {
  render() {
    const proposed_uses = this.props.proposed_uses || [];
    const main_attributes = this.props.main_attributes || [];
    const main_uses = this.props.main_uses || [];

    return (
      <BaseLayout
        title="PREVISUALIZACIÓN DE TARJETA DE PROPUESTA"
        onClose={this.props.onClose}
        footerXs={[14, 0, 10]}
        showCloseBtn={true}
        footerRightComponent={
          <Progress
            nextBtnHtmlType="submit"
            nextBtnLoading={this.props.isSubmitting}
            nextText="Proponer"
            step={17}
            steps={17}
          />
        }
      >
        <div className="main-content m-t-20">
          <TopNavigator previous={this.props.previous} step={17} steps={17} />
          <Row gutter={30}>
            <Col md={6}>
              <h2>{this.props.name}</h2>
              {this.props.owner && (
                <h3>{this.props.owner}</h3>
              )}
            </Col>
            <Col md={10}>
              <div className="form-group">
                <img
                  src={this.props.photograph}
                  className="img-responsive"
                  width="480"
                />
              </div>
            </Col>
            <Col md={8}>
              <p className="lead">¿Por qué se debe proteger este terreno?</p>
              <p>{this.props.importance_of_protection || 'No definido.'}</p>
            </Col>
          </Row>

          <Divider
            dashed
            style={{
              borderColor: '#000',
              borderStyle: 'dotted',
            }}
          />

          <Row gutter={16}>
            <Col md={16}>
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Row gutter={16}>
                    <Col xs={12} md={12}>
                      <Badge
                        title="Localizado"
                        description={this.props.location || 'No definido.'}
                        color="default"
                        shape="round"
                      />
                    </Col>
                    <Col xs={12} md={12}>
                      <Badge
                        title="Extensión"
                        description={
                          <span>
                            {Numeral(this.props.area_size).format('0,0')} m
                            <sup>2</sup>
                          </span>
                        }
                        color="default"
                        shape="round"
                      />
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col xs={12} md={12}>
                      <Badge
                        title="Compuesto"
                        description={
                          this.props.plots_count +
                          ' parcela' +
                          (this.props.plots_count > 1 ? 's' : '')
                        }
                        color="default"
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
                        color="default"
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
                    color="default"
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
                    <li key={index}>
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
                    <li key={index}>
                      {LAND_PROPOSED_USE[item] || 'No definido'}
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
          </Row>

          <BottomNavigator
            nextBtnLoading={this.props.isSubmitting}
            nextBtnHtmlType="submit"
            nextText="Proponer"
            onPrevious={this.props.previous}
          />
        </div>
      </BaseLayout>
    );
  }
}

SubmitStep.defaultProps = {
  main_attributes: [],
  main_uses: [],
  proposed_uses: [],
};

SubmitStep.propTypes = {
  name: PropTypes.string,
  photograph: PropTypes.string,
  owner: PropTypes.string,
  importance_of_protection: PropTypes.string,
  location: PropTypes.string,
  main_attributes: PropTypes.array,
  other_main_attributes: PropTypes.string,
  main_uses: PropTypes.array,
  other_main_uses: PropTypes.string,
  proposed_uses: PropTypes.array,
  area_size: PropTypes.number,
  plots_count: PropTypes.number,
  coordinates: PropTypes.object,
  isSubmitting: PropTypes.bool,
  next: PropTypes.func,
  previous: PropTypes.func,
  handleChange: PropTypes.func,
  onClose: PropTypes.func,
};

export default SubmitStep;
