import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Checkbox, Input } from 'antd';

import BaseLayout from '../../layout/base';
import BottomNavigator from '../BottomNavigator';
import TopNavigator from '../TopNavigator';
import Progress from '../Progress';

class MainAttributesStep extends React.Component {
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
    setFieldValue('lands_attributes', checkedValue);

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
        footerXs={[14, 0, 10]}
        showCloseBtn={true}
        footerRightComponent={
          <Progress onNext={this.handleOnNext} step={16} steps={21} />
        }
      >
        <div className="main-content m-t-20">
          <TopNavigator previous={this.props.previous} step={16} steps={21} />
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
            </Col>
            <Col md={12}>
              <Checkbox.Group
                style={{ width: '100%' }}
                value={this.props.lands_attributes}
                onChange={this.handleOnChange}
              >
                <Row>
                  <Col span={24}>
                    <Checkbox value="nature" className="inputprop radiobutton">
                      Naturaleza
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox
                      value="educational"
                      className="inputprop radiobutton"
                    >
                      Educativos
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox
                      value="landscape"
                      className="inputprop radiobutton"
                    >
                      Paisajistas y escénicos
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox
                      value="others"
                      id="inputotro3"
                      className="inputprop radiobutton"
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
};

export default MainAttributesStep;
