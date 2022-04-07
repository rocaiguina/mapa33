import React from 'react';
import PropTypes from 'prop-types';
import { Col, Radio, Row, Typography } from 'antd';

import BaseLayout from '../../layout/base';
import BottomNavigator from '../BottomNavigator';
import TopNavigator from '../TopNavigator';
import Progress from '../Progress';

const { Text } = Typography;

class InheritanceAgreeStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
    };
  }

  handleOnChange = e => {
    const self = this;
    this.props.handleChange(e);
    setTimeout(function() {
      self.props.next();
    }, 400);
  };

  handleOnNext = () => {
    if (this.props.inheritance_agree !== null) {
      this.props.next();
    } else {
      this.setState({
        errors: { inheritance_agree: 'Campo requerido' },
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
          <Progress onNext={this.handleOnNext} step={9} steps={20} />
        }
      >
        <div className="main-content">
          <TopNavigator previous={this.props.previous} step={9} steps={20} />
          <Row gutter={30}>
            <Col
              md={12}
              style={{
                textAlign: 'center',
              }}
            >
              <h2>¿Todos los herederos están de acuerdo?</h2>
              {errors.inheritance_agree && (
                <Text type="danger">{errors.inheritance_agree}</Text>
              )}
            </Col>
            <Col
              md={12}
              style={{
                textAlign: 'center',
              }}
            >
              <Radio.Group
                name="inheritance_agree"
                buttonStyle="solid"
                value={this.props.inheritance_agree}
                onChange={this.handleOnChange}
              >
                <Radio.Button
                  className="inputprop radioprop radiosi form3"
                  value={true}
                >
                  Si
                </Radio.Button>
                <Radio.Button
                  className="inputprop radioprop radiono form3"
                  value={false}
                >
                  No
                </Radio.Button>
              </Radio.Group>
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

InheritanceAgreeStep.propTypes = {
  inheritance_agree: PropTypes.bool,
  next: PropTypes.func,
  previous: PropTypes.func,
  handleChange: PropTypes.func,
  onClose: PropTypes.func,
};

export default InheritanceAgreeStep;
