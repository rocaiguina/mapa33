import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Checkbox, Input, Typography } from 'antd';

import BaseLayout from '../../layout/base';
import BottomNavigator from '../BottomNavigator';
import TopNavigator from '../TopNavigator';
import Progress from '../Progress';
import { LAND_ISSUES } from '../../../constants';

const { Text } = Typography;

class ProblemLandStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputotro: false,
      errors: {},
    };
  }

  handleOnNext = () => {
    if (
      Array.isArray(this.props.lands_problem) &&
      this.props.lands_problem.length > 0
    ) {
      this.props.next();
    } else {
      this.setState({
        errors: { lands_problem: 'Campo requerido' },
      });
    }
  };

  handleOnChange = checkedValue => {
    const { setFieldValue } = this.props;
    setFieldValue('lands_problem', checkedValue);

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
          <Progress onNext={this.handleOnNext} step={8} steps={20} />
        }
      >
        <div className="main-content">
          <TopNavigator previous={this.props.previous} step={8} steps={20} />
          <Row gutter={30}>
            <Col
              md={12}
              style={{
                textAlign: 'center',
              }}
            >
              <h2>¿El terreno tiene algún problema?</h2>
              {errors.lands_problem && (
                <Text type="danger">{errors.lands_problem}</Text>
              )}
            </Col>
            <Col md={12}>
              <Checkbox.Group
                name="lands_problem"
                style={{ width: '100%' }}
                value={this.props.lands_problem}
                onChange={this.handleOnChange}
              >
                <Row>
                  {LAND_ISSUES.map(item => (
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
                  name="lands_other_problem"
                  className="inputprop"
                  id="otro"
                  size="large"
                  value={this.props.lands_other_problem}
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

ProblemLandStep.propTypes = {
  lands_problem: PropTypes.array,
  lands_other_problem: PropTypes.string,
  next: PropTypes.func,
  previous: PropTypes.func,
  handleChange: PropTypes.func,
  setFieldValue: PropTypes.func,
  onClose: PropTypes.func,
};

export default ProblemLandStep;
