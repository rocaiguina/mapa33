import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row, Input } from 'antd';

import BaseLayout from '../../layout/base';
import Icon from '../../ui/Icon';

class YesFillFormStep extends React.Component {
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
          <Button onClick={this.handleOnNext}>Continuar</Button>
        }
      >
        <div className="main-content m-t-20">
          <Row gutter={30}>
            <Col span={12}>
              <Button onClick={this.props.previous}>Back</Button>
            </Col>
            <Col span={12}>
              <p className="text-right">
                <strong>Paso:</strong>
                <br />13 de 21
              </p>
            </Col>
          </Row>
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
