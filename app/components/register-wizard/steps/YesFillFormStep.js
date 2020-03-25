import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row, Input } from 'antd';

import BaseLayout from '../../layout/base';
import BottomNavigator from '../BottomNavigator';
import TopNavigator from '../TopNavigator';
import Progress from '../Progress';

class YesFillFormStep extends React.Component {
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
          <Progress onNext={this.handleOnNext} step={13} steps={21} />
        }
      >
        <div className="main-content m-t-20">
          <TopNavigator previous={this.props.previous} step={13} steps={21} />
          <Row gutter={30}>
            <Col md={8} />
            <Col md={8}>
              <h2>Ingresa los datos del propietario</h2>
              <div className="form-group">
                <Input
                  name="owner_name"
                  className="inputprop"
                  size="large"
                  placeholder="Nombre:"
                  value={this.props.owner_name}
                  onChange={this.props.handleChange}
                />
              </div>
              <div className="form-group">
                <Input
                  name="owner_phone"
                  className="inputprop"
                  size="large"
                  placeholder="Tel:"
                  value={this.props.owner_phone}
                  onChange={this.props.handleChange}
                />
              </div>
              <div className="form-group">
                <Input
                  name="owner_email"
                  className="inputprop"
                  size="large"
                  placeholder="@:"
                  value={this.props.owner_email}
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

YesFillFormStep.propTypes = {
  owner_name: PropTypes.string,
  owner_phone: PropTypes.string,
  owner_email: PropTypes.string,
  next: PropTypes.func,
  previous: PropTypes.func,
  handleChange: PropTypes.func,
};


export default YesFillFormStep;
