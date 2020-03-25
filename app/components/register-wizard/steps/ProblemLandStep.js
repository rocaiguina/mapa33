import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Checkbox, Input } from 'antd';

import BaseLayout from '../../layout/base';
import BottomNavigator from '../BottomNavigator';
import TopNavigator from '../TopNavigator';
import Progress from '../Progress';

class ProblemLandStep extends React.Component {
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
    setFieldValue('lands_problem', checkedValue);

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
          <Progress onNext={this.handleOnNext} step={9} steps={21} />
        }
      >
        <div className="main-content m-t-20">
          <TopNavigator previous={this.props.previous} step={9} steps={21} />
          <Row gutter={30}>
            <Col
              md={12}
              style={{
                textAlign: 'center',
              }}
            >
              <h2>¿El terreno tiene algún problema?</h2>
            </Col>
            <Col md={12}>
              <Checkbox.Group
                name="lands_problem"
                style={{ width: '100%' }}
                value={this.props.lands_problem}
                onChange={this.handleOnChange}
              >
                <Row>
                  <Col span={24}>
                    <Checkbox
                      value="crim_owed"
                      className="inputprop radiobutton"
                    >
                      Deuda en el CRIM
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox
                      value="legality_problems"
                      className="inputprop radiobutton"
                    >
                      Problemas legales
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox
                      value="ownership_problems"
                      className="inputprop radiobutton"
                    >
                      Problemas de titularidad
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox
                      value="others"
                      className="inputprop radiobutton"
                      onChange={this.mostrarinput}
                    >
                      Otros
                    </Checkbox>
                  </Col>
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
};

export default ProblemLandStep;
