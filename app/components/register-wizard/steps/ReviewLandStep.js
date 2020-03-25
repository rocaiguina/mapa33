import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';

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
    return (
      <BaseLayout
        title="FORMULARIO DE PROPUESTA"
        showCloseBtn={true}
        footerRightComponent={
          <Progress onNext={this.handleOnNext} step={3} steps={21} />
        }
      >
        <div className="main-content m-t-20">
          <TopNavigator
            previous={this.props.previous}
            step={3}
            steps={21}
          />
          <Row gutter={30}>
            <Col md={10}>
              <div className="form-group">
                <img
                  className="img-responsive"
                  src="https://dummyimage.com/600x400/dddddd/ffffff"
                />
              </div>
            </Col>
            <Col md={14}>
              <Row gutter={30}>
                <Col xs={12}>
                  <p>
                    <strong>Parcelas seleccionadas</strong>
                    <br />3
                  </p>
                  <p>
                    <strong>Área</strong>
                    <br />
                    1,136,480.54 M<sup>2</sup>
                  </p>
                  <p>
                    <strong>Municipio</strong>
                    <br />
                    Orocovis
                  </p>
                </Col>
                <Col xs={12}>
                  <p>
                    <strong>Catástro 1</strong>
                    <br />
                    No hay número
                  </p>
                  <p>
                    <strong>Catástro 2</strong>
                    <br />
                    000-000-000-00-000
                  </p>
                  <p>
                    <strong>Catástro 1</strong>
                    <br />
                    No hay número
                  </p>
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

ReviewLandStep.propTypes = {
  next: PropTypes.func,
  previous: PropTypes.func,
  handleChange: PropTypes.func,
};

export default ReviewLandStep;
