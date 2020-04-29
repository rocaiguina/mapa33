import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import Numeral from 'numeral';

import BaseLayout from '../../layout/base';
import BottomNavigator from '../BottomNavigator';
import TopNavigator from '../TopNavigator';
import Progress from '../Progress';

class ReviewLandStep extends React.Component {
  handleOnNext = () => {
    // TODO: validate before continue.
    this.props.next();
  };

  render() {
    const photograph = this.props.photograph || '/images/no-land-image.jpg';
    return (
      <BaseLayout
        title="FORMULARIO DE PROPUESTA"
        onClose={this.props.onClose}
        footerXs={[14, 0, 10]}
        showCloseBtn={true}
        footerRightComponent={
          <Progress onNext={this.handleOnNext} step={3} steps={20} />
        }
      >
        <div className="main-content">
          <TopNavigator
            previous={this.props.previous}
            step={3}
            steps={20}
          />
          <Row gutter={30}>
            <Col md={10}>
              <div className="form-group">
                <img
                  className="img-responsive"
                  src={photograph}
                  width="480"
                />
              </div>
            </Col>
            <Col md={14}>
              <Row gutter={30}>
                <Col xs={12}>
                  <p>
                    <strong>Parcelas seleccionadas</strong>
                    <br />{this.props.lands.length}
                  </p>
                  <p>
                    <strong>Área</strong>
                    <br />
                    {Numeral(this.props.area).format('0,0')} acres
                  </p>
                  <p>
                    <strong>Municipio</strong>
                    <br />
                    {this.props.location}
                  </p>
                </Col>
                <Col xs={12}>
                  {this.props.lands.map((item, index) => (
                    <p key={index}>
                      <strong>Catástro {index + 1}</strong>
                      <br />
                      { item.catastro || 'No hay número' }
                    </p>
                  ))}
                </Col>
              </Row>
            </Col>
          </Row>
          <BottomNavigator
            onPrevious={this.props.previous}
            onNext={this.handleOnNext}
          />
        </div>
      </BaseLayout>
    );
  }
}

ReviewLandStep.defaultProps = {
  lands: [],
  area: 0,
  location: '',
};

ReviewLandStep.propTypes = {
  photograph: PropTypes.string,
  lands: PropTypes.array,
  area: PropTypes.number,
  location: PropTypes.string,
  next: PropTypes.func,
  previous: PropTypes.func,
  handleChange: PropTypes.func,
  onClose: PropTypes.func,
};

export default ReviewLandStep;
