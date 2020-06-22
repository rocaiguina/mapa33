import React from 'react';
import PropTypes from 'prop-types';
import { Col, Input, Row, Typography } from 'antd';

import BaseLayout from '../../layout/base';
import BottomNavigator from '../BottomNavigator';
import TopNavigator from '../TopNavigator';
import Progress from '../Progress';

const { Text } = Typography;

class NameLand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
    };
  }

  handleOnNext = () => {
    if (this.props.land_name) {
      this.props.next();
    } else {
      this.setState({
        errors: { land_name: 'Campo requerido' },
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
          <Progress onNext={this.handleOnNext} step={19} steps={20} />
        }
      >
        <div className="main-content">
          <TopNavigator previous={this.props.previous} step={19} steps={20} />
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
                  maxLength={50}
                  onChange={this.props.handleChange}
                />
                {errors.land_name && (
                  <Text type="danger">{errors.land_name}</Text>
                )}
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
  onClose: PropTypes.func,
};

export default NameLand;
