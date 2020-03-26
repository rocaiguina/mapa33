import React from 'react';
import PropTypes from 'prop-types';
import { Col, Input, Row } from 'antd';

import BaseLayout from '../../layout/base';
import BottomNavigator from '../BottomNavigator';
import TopNavigator from '../TopNavigator';
import Progress from '../Progress';

class NameLand extends React.Component {
  handleOnNext = () => {
    // TODO: validate before continue.
    this.props.next();
  };

  render() {
    return (
      <BaseLayout
        title="FORMULARIO DE PROPUESTA"
        footerXs={[14, 0, 10]}
        showCloseBtn={true}
        footerRightComponent={
          <Progress onNext={this.handleOnNext} step={20} steps={21} />
        }
      >
        <div className="main-content m-t-20">
          <TopNavigator previous={this.props.previous} step={20} steps={21} />
          <Row gutter={30}>
            <Col md={8} />
            <Col md={8}>
              <h2>
                ¿Qué nombre se debe utilizar para identificar este terreno?
              </h2>
              <div className="form-group">
                <Input
                  name="land_name"
                  className="inputprop"
                  size="large"
                  value={this.props.land_name}
                  onChange={this.props.handleChange}
                />
              </div>
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

NameLand.propTypes = {
  land_name: PropTypes.string,
  next: PropTypes.func,
  previous: PropTypes.func,
  handleChange: PropTypes.func,
};

export default NameLand;
