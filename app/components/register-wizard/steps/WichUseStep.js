import React from 'react';
import PropTypes from 'prop-types';
import { Col, Checkbox, Row, Typography } from 'antd';

import BaseLayout from '../../layout/base';
import BottomNavigator from '../BottomNavigator';
import TopNavigator from '../TopNavigator';
import Progress from '../Progress';

const { Text } = Typography;

class WichUseStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
    };
  }

  handleOnNext = () => {
    if (
      Array.isArray(this.props.wich_uses) &&
      this.props.wich_uses.length > 0
    ) {
      this.props.next();
    } else {
      this.setState({
        errors: { wich_uses: 'Campo requerido' },
      });
    }
  };

  handleOnChange = checkedValue => {
    const { setFieldValue } = this.props;
    setFieldValue('wich_uses', checkedValue);
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
              {errors.wich_uses && (
                <Text type="danger">{errors.wich_uses}</Text>
              )}
            </Col>
            <Col
              md={12}
              style={{
                textAlign: 'left',
              }}
            >
              <Checkbox.Group
                value={this.props.wich_uses}
                onChange={this.handleOnChange}
              >
                <div className="form-radio">
                  <Checkbox
                    value="Investigación Científica"
                    className="blockstyleradio"
                  >
                    Investigación Científica
                  </Checkbox>
                </div>
                <div className="form-radio">
                  <Checkbox
                    value="Monitoreo Ambiental"
                    className="blockstyleradio"
                  >
                    Monitoreo Ambiental
                  </Checkbox>
                </div>
                <div className="form-radio">
                  <Checkbox
                    value="Usos espirituales"
                    className="blockstyleradio"
                  >
                    Usos espirituales
                  </Checkbox>
                </div>
                <div className="form-radio">
                  <Checkbox
                    value="Educación"
                    className="blockstyleradio"
                  >
                    Educación
                  </Checkbox>
                </div>
                <div className="form-radio">
                  <Checkbox
                    value="Recreación"
                    className="blockstyleradio"
                  >
                    Recreación
                  </Checkbox>
                </div>
                <div className="form-radio">
                  <Checkbox
                    value="Turismo"
                    className="blockstyleradio"
                  >
                    Turismo
                  </Checkbox>
                </div>
                <div className="form-radio">
                  <Checkbox
                    value="Usos sostenibles"
                    className="blockstyleradio"
                  >
                    Usos sostenibles
                  </Checkbox>
                </div>
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

WichUseStep.propTypes = {
  wich_uses: PropTypes.array,
  next: PropTypes.func,
  previous: PropTypes.func,
  handleChange: PropTypes.func,
};

export default WichUseStep;
