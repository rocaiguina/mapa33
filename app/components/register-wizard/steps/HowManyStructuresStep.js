import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Checkbox, Input, Typography } from 'antd';

import BaseLayout from '../../layout/base';
import BottomNavigator from '../BottomNavigator';
import TopNavigator from '../TopNavigator';
import Progress from '../Progress';

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

    if (checkedValue.indexOf('Otros') != -1) {
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
          <Progress onNext={this.handleOnNext} step={14} steps={20} />
        }
      >
        <div className="main-content m-t-20">
          <TopNavigator previous={this.props.previous} step={14} steps={20} />
          <Row gutter={30}>
            <Col
              md={12}
              style={{
                textAlign: 'center',
              }}
            >
              <h2>¿Qué tipo de estructuras hay en el terreno?</h2>
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
                  <Col span={24}>
                    <Checkbox
                      value="Residencial"
                      className="inputprop radiobutton"
                    >
                      Residencial
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox
                      value="Comercial / Oficina"
                      className="inputprop radiobutton"
                    >
                      Comercial / Oficina
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox
                      value="Agrícola"
                      className="inputprop radiobutton"
                    >
                      Agrícola
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox
                      id="inputotro2"
                      className="inputprop radiobutton"
                      value="Otros"
                    >
                      Otros
                    </Checkbox>
                  </Col>
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
