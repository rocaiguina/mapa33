import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Divider, Row } from 'antd';
import Numeral from 'numeral';

import BaseLayout from '../../layout/base';
import Badge from '../../ui/Badge';
import Coordinates from '../../ui/Coordinates';
import MiniMap from '../../map-view/MiniMap';
import BottomNavigator from '../BottomNavigator';
import TopNavigator from '../TopNavigator';
import Progress from '../Progress';

class SubmitStep extends React.Component {
  render() {
    return (
      <BaseLayout
        title="PREVISUALIZACIÓN DE TARJETA DE PROPUESTA"
        footerXs={[14, 0, 10]}
        showCloseBtn={true}
        footerRightComponent={
          <Progress
            nextBtnHtmlType="submit"
            nextText="Proponer"
            onNext={this.handleOnNext}
            step={21}
            steps={21}
          />
        }
      >
        <div className="main-content m-t-20">
          <TopNavigator previous={this.props.previous} step={21} steps={21} />
          <Row gutter={30}>
            <Col md={6}>
              <h2>El terreno del futuro</h2>
              <h3>Junior caño</h3>
            </Col>
            <Col md={10}>
              <MiniMap data={this.props.summary.geojson} />
            </Col>
            <Col md={8}>
              <p>
                ¿Por qué es importante la protección de este terreno en
                particular?
              </p>
              <p>Es un lugar con rasgos naturales especiales.</p>
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
                <Col xs={12} md={6}>
                  <Badge
                    title="Localizado"
                    description="Fajardo"
                    shape="round"
                  />
                </Col>
                <Col xs={12} md={6}>
                  <Badge
                    title="Extensión"
                    description={Numeral(0).format('0,0') + ' acres'}
                    shape="round"
                  />
                </Col>
                <Col xs={24} md={12}>
                  <Badge
                    title="Estado actual del terreno"
                    description="Abandonado"
                    shape="round"
                  />
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={12} md={6}>
                  <Badge
                    title="Compuesto"
                    description="2 parcelas"
                    shape="round"
                  />
                </Col>
                <Col xs={12} md={6}>
                  <Badge
                    title="Coordenadas"
                    description={<Coordinates point={[0, 0]} />}
                    shape="round"
                  />
                </Col>
                <Col xs={24} md={12}>
                  <Badge
                    title="Atributos principales del lugar"
                    description="Naturales"
                    shape="round"
                  />
                </Col>
              </Row>
            </Col>
            <Col md={8}>
              <div className="land-features">
                <p>Usos principales propuestos:</p>
                <ul>
                  <li>Educacion</li>
                  <li>Recreacion</li>
                  <li>Usos Sostenibles</li>
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

SubmitStep.propTypes = {
  isSubmitting: PropTypes.bool,
  summary: PropTypes.object,
  next: PropTypes.func,
  previous: PropTypes.func,
  handleChange: PropTypes.func,
};

export default SubmitStep;
