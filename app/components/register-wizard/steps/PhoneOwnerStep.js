import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Input } from 'antd';

import BaseLayout from '../../layout/base';
import BottomNavigator from '../BottomNavigator';
import TopNavigator from '../TopNavigator';
import Progress from '../Progress';

class PhoneOwnerStep extends React.Component {
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
          <Progress onNext={this.handleOnNext} step={6} steps={21} />
        }
      >
        <div className="main-content m-t-20">
          <TopNavigator previous={this.props.previous} step={6} steps={21} />
          <Row gutter={30}>
            <Col md={8} />
            <Col md={8}>
              <h2>¿Cuál es el nombre y el teléfono del dueño?</h2>
              <div className="form-group">
                <Input.TextArea
                  name="owner_name"
                  className="inputprop"
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
                  placeholder="Teléfono:"
                  value={this.props.owner_phone}
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

PhoneOwnerStep.propTypes = {
  owner_name: PropTypes.string,
  owner_phone: PropTypes.string,
  next: PropTypes.func,
  previous: PropTypes.func,
  handleChange: PropTypes.func,
};

export default PhoneOwnerStep;
