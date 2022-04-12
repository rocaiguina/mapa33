import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Checkbox, Input, Typography } from 'antd';

import BaseLayout from '../../layout/base';
import BottomNavigator from '../BottomNavigator';
import TopNavigator from '../TopNavigator';
import Progress from '../Progress';
import { LAND_STRUCTURES } from '../../../constants';

const { Text } = Typography;

class HowManyStructuresStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputotro: false,
      errors: {},
    };
  }

  handleOnNext = () => {
    if (
      Array.isArray(this.props.lands_structures) &&
      this.props.lands_structures.length > 0
    ) {
      this.props.next();
    } else {
      this.setState({
        errors: { lands_structures: 'Campo requerido' },
      });
    }
  };

  handleOnChange = checkedValue => {
    const { setFieldValue } = this.props;
    setFieldValue('lands_structures', checkedValue);

    if (checkedValue.indexOf('others') != -1) {
      this.setState({ inputotro: true });
    } else {
      this.setState({ inputotro: false });
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
          <Progress onNext={this.handleOnNext} step={10} steps={17} />
        }
      >
        <div className="main-content">
          <TopNavigator previous={this.props.previous} step={10} steps={17} />
          <Row gutter={30}>
            <Col
              md={12}
              style={{
                textAlign: 'center',
              }}
            >
              <h2>¿Qué tipo de infraestructura hay en el terreno?</h2>
              {errors.lands_structures && (
                <Text type="danger">{errors.lands_structures}</Text>
              )}
            </Col>
            <Col md={12}>
              <Checkbox.Group
                style={{ width: '100%' }}
                value={this.props.lands_structures}
                onChange={this.handleOnChange}
              >
                <Row>
                  {LAND_STRUCTURES.map(item => (
                    <Col key={item.value} span={24}>
                      <Checkbox
                        value={item.value}
                        className="inputprop radiobutton"
                      >
                        {item.label}
                      </Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
              {this.state.inputotro && (
                <Input
                  name="lands_other_structures"
                  className="inputprop"
                  id="otro2"
                  size="large"
                  value={this.props.lands_other_structures}
                  onChange={this.props.handleChange}
                  maxLength="100"
                />
              )}
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

HowManyStructuresStep.propTypes = {
  lands_structures: PropTypes.array,
  lands_other_structures: PropTypes.string,
  next: PropTypes.func,
  previous: PropTypes.func,
  handleChange: PropTypes.func,
  setFieldValue: PropTypes.func,
  onClose: PropTypes.func,
};

export default HowManyStructuresStep;
