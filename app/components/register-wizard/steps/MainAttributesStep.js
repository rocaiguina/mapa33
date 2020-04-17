import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Checkbox, Input, Typography } from 'antd';

import BaseLayout from '../../layout/base';
import BottomNavigator from '../BottomNavigator';
import TopNavigator from '../TopNavigator';
import Progress from '../Progress';

const { Text } = Typography;

class MainAttributesStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputotro: false,
      errors: {},
    };
  }

  handleOnNext = () => {
    if (
      Array.isArray(this.props.lands_attributes) &&
      this.props.lands_attributes.length > 0
    ) {
      this.props.next();
    } else {
      this.setState({
        errors: { lands_attributes: 'Campo requerido' },
      });
    }
  };

  handleOnChange = checkedValue => {
    const { setFieldValue } = this.props;
    setFieldValue('lands_attributes', checkedValue);

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
          <Progress onNext={this.handleOnNext} step={15} steps={20} />
        }
      >
        <div className="main-content m-t-20">
          <TopNavigator previous={this.props.previous} step={15} steps={20} />
          <Row gutter={30}>
            <Col
              md={12}
              style={{
                textAlign: 'center',
              }}
            >
              <h2>
                ¿Cuáles son los principales atributos que resaltan el valor para
                la conservación de esta propiedad?
              </h2>
              {errors.lands_attributes && (
                <Text type="danger">{errors.lands_attributes}</Text>
              )}
            </Col>
            <Col md={12}>
              <Checkbox.Group
                style={{ width: '100%' }}
                value={this.props.lands_attributes}
                onChange={this.handleOnChange}
              >
                <Row>
                  <Col span={24}>
                    <Checkbox
                      value="Naturaleza"
                      className="inputprop radiobutton"
                    >
                      Naturaleza
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox
                      value="Educativos"
                      className="inputprop radiobutton"
                    >
                      Educativos
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox
                      value="Paisajistas y escénicos"
                      className="inputprop radiobutton"
                    >
                      Paisajistas y escénicos
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox
                      id="inputotro3"
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
                  name="lands_other_attributes"
                  className="inputprop"
                  id="otro3"
                  size="large"
                  value={this.props.lands_other_attributes}
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

MainAttributesStep.propTypes = {
  lands_attributes: PropTypes.array,
  lands_other_attributes: PropTypes.string,
  next: PropTypes.func,
  previous: PropTypes.func,
  handleChange: PropTypes.func,
  setFieldValue: PropTypes.func,
  onClose: PropTypes.func,
};

export default MainAttributesStep;
