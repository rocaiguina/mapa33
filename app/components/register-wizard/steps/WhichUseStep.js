import React from 'react';
import PropTypes from 'prop-types';
import { Col, Checkbox, Row, Typography } from 'antd';

import BaseLayout from '../../layout/base';
import BottomNavigator from '../BottomNavigator';
import TopNavigator from '../TopNavigator';
import Progress from '../Progress';

const { Text } = Typography;

class WhichUseStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
    };
  }

  handleOnNext = () => {
    if (
      Array.isArray(this.props.which_uses) &&
      this.props.which_uses.length > 0
    ) {
      this.props.next();
    } else {
      this.setState({
        errors: { which_uses: 'Campo requerido' },
      });
    }
  };

  handleOnChange = checkedValue => {
    const { setFieldValue } = this.props;
    setFieldValue('which_uses', checkedValue);
  };

  render() {
    const { errors } = this.state;
    return (
      <BaseLayout
        title="FORMULARIO DE PROPUESTA"
        footerXs={[14, 0, 10]}
        showCloseBtn={true}
        footerRightComponent={
          <Progress onNext={this.handleOnNext} step={18} steps={20} />
        }
      >
        <div className="main-content m-t-20">
          <TopNavigator previous={this.props.previous} step={18} steps={20} />
          <Row gutter={30}>
            <Col
              md={12}
              style={{
                textAlign: 'center',
              }}
            >
              <h2>¿Cuál uso le darías al terreno?</h2>
              {errors.which_uses && (
                <Text type="danger">{errors.which_uses}</Text>
              )}
            </Col>
            <Col
              md={12}
              style={{
                textAlign: 'left',
              }}
            >
              <Checkbox.Group
                style={{ width: '100%' }}
                value={this.props.which_uses}
                onChange={this.handleOnChange}
              >
                <Row>
                  <Col span={24}>
                    <Checkbox
                      value="Investigación Científica"
                      className="inputprop radiobutton"
                    >
                      Investigación Científica
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox
                      value="Monitoreo Ambiental"
                      className="inputprop radiobutton"
                    >
                      Monitoreo Ambiental
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox
                      value="Usos espirituales"
                      className="inputprop radiobutton"
                    >
                      Usos espirituales
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox
                      value="Educación"
                      className="inputprop radiobutton"
                    >
                      Educación
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox
                      value="Recreación"
                      className="inputprop radiobutton"
                    >
                      Recreación
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox
                      value="Turismo"
                      className="inputprop radiobutton"
                    >
                      Turismo
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox
                      value="Usos sostenibles"
                      className="inputprop radiobutton"
                    >
                      Usos sostenibles
                    </Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
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

WhichUseStep.propTypes = {
  which_uses: PropTypes.array,
  next: PropTypes.func,
  previous: PropTypes.func,
  handleChange: PropTypes.func,
  setFieldValue: PropTypes.func,
};

export default WhichUseStep;
