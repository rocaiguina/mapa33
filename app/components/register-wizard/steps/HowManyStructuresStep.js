import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Checkbox, Input } from 'antd';

import BaseLayout from '../../layout/base';
import BottomNavigator from '../BottomNavigator';
import TopNavigator from '../TopNavigator';
import Progress from '../Progress';

class HowManyStructuresStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputotro: false,
    };
  }

  handleOnNext = () => {
    // TODO: validate before continue.
    this.props.next();
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
    return (
      <BaseLayout
        title="FORMULARIO DE PROPUESTA"
        showCloseBtn={true}
        footerRightComponent={
          <Progress onNext={this.handleOnNext} step={15} steps={21} />
        }
      >
        <div className="main-content m-t-20">
          <TopNavigator previous={this.props.previous} step={15} steps={21} />
          <Row gutter={30}>
            <Col
              md={12}
              style={{
                textAlign: 'center',
              }}
            >
              <h2>¿Qué tipo de estructuras hay en el terreno?</h2>
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
                      value="residential"
                      className="inputprop radiobutton"
                    >
                      Residencial
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox
                      value="commercial"
                      className="inputprop radiobutton"
                    >
                      Comercial / Oficina
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox
                      value="agricultural"
                      className="inputprop radiobutton"
                    >
                      Agrícola
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox
                      value="others"
                      id="inputotro2"
                      className="inputprop radiobutton"
                    >
                      Otras
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
};

export default HowManyStructuresStep;
