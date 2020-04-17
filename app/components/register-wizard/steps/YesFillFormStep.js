import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row, Input, Typography } from 'antd';

import BaseLayout from '../../layout/base';
import BottomNavigator from '../BottomNavigator';
import TopNavigator from '../TopNavigator';
import Progress from '../Progress';

const { Text } = Typography;

class YesFillFormStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
    };
  }

  handleOnNext = () => {
    if (this.props.owner_name) {
      this.props.next();
    } else {
      this.setState({
        errors: { owner_name: 'Campo requerido' },
      });
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <BaseLayout
        title="FORMULARIO DE PROPUESTA"
        onClose={this.props.onClose}
        footerXs={[14, 0, 10]}
        showCloseBtn={true}
        footerRightComponent={
          <Progress onNext={this.handleOnNext} step={12} steps={20} />
        }
      >
        <div className="main-content m-t-20">
          <TopNavigator previous={this.props.previous} step={12} steps={20} />
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
                {errors.owner_name && (
                  <Text type="danger">{errors.owner_name}</Text>
                )}
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
              <div className="form-group">
                <Input
                  name="owner_email"
                  className="inputprop"
                  size="large"
                  placeholder="Email:"
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
  onClose: PropTypes.func,
};


export default YesFillFormStep;
