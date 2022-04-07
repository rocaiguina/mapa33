import React from 'react';
import PropTypes from 'prop-types';
import { Col, Checkbox, Row, Typography } from 'antd';

import BaseLayout from '../../layout/base';
import BottomNavigator from '../BottomNavigator';
import TopNavigator from '../TopNavigator';
import Progress from '../Progress';
import { LAND_PROPOSED_USES } from '../../../constants';

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
        onClose={this.props.onClose}
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
              <h2>¿Cuáles usos propones para el terreno?</h2>
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
                  {LAND_PROPOSED_USES.map(item => (
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
  onClose: PropTypes.func,
};

export default WhichUseStep;
