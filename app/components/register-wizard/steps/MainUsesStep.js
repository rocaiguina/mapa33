import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Checkbox, Input, Typography } from 'antd';

import BaseLayout from '../../layout/base';
import BottomNavigator from '../BottomNavigator';
import TopNavigator from '../TopNavigator';
import Progress from '../Progress';

const { Text } = Typography;

class MainUsesStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputotro: false,
      errors: {},
    };
  }

  handleOnNext = () => {
    if (
      Array.isArray(this.props.lands_main_uses) &&
      this.props.lands_main_uses.length > 0
    ) {
      this.props.next();
    } else {
      this.setState({
        errors: { lands_main_uses: 'Campo requerido' },
      });
    }
  };

  handleOnChange = checkedValue => {
    const { setFieldValue } = this.props;
    setFieldValue('lands_main_uses', checkedValue);

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
        footerXs={[14, 0, 10]}
        showCloseBtn={true}
        footerRightComponent={
          <Progress onNext={this.handleOnNext} step={13} steps={20} />
        }
      >
        <div className="main-content m-t-20">
          <TopNavigator previous={this.props.previous} step={13} steps={20} />
          <Row gutter={30}>
            <Col
              md={12}
              style={{
                textAlign: 'center',
              }}
            >
              <h2>
                ¿Cuáles son los usos principales actuales de la propiedad?
              </h2>
              {errors.lands_main_uses && (
                <Text type="danger">{errors.lands_main_uses}</Text>
              )}
            </Col>
            <Col md={12}>
              <Checkbox.Group
                style={{ width: '100%' }}
                value={this.props.lands_main_uses}
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
                      value="Comercial"
                      className="inputprop radiobutton"
                    >
                      Comercial
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox
                      value="Natural / Bosque"
                      className="inputprop radiobutton"
                    >
                      Natural / Bosque
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox
                      id="inputotro1"
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
                  name="lands_other_main_uses"
                  className="inputprop"
                  id="otro1"
                  size="large"
                  value={this.props.lands_other_main_uses}
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

MainUsesStep.propTypes = {
  lands_main_uses: PropTypes.array,
  lands_other_main_uses: PropTypes.string,
  next: PropTypes.func,
  previous: PropTypes.func,
  handleChange: PropTypes.func,
  setFieldValue: PropTypes.func,
};

export default MainUsesStep;
