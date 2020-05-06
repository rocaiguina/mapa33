import React from 'react';
import PropTypes from 'prop-types';
import { Col, Radio, Row, Typography } from 'antd';

import BaseLayout from '../../layout/base';
import BottomNavigator from '../BottomNavigator';
import TopNavigator from '../TopNavigator';
import Progress from '../Progress';

const { Text } = Typography;

class ContaminationStep extends React.Component {
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
    if (this.props.has_contamination !== null) {
      this.props.next();
    } else {
      this.setState({
        errors: { has_contamination: 'Campo requerido' },
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
          <Progress onNext={this.handleOnNext} step={16} steps={20} />
        }
      >
        <div className="main-content">
          <TopNavigator previous={this.props.previous} step={16} steps={20} />
          <Row gutter={30}>
            <Col
              md={12}
              style={{
                textAlign: 'center',
              }}
            >
              <h2>
                ¿El terreno ha tenido problemas de contaminación en el pasado?
              </h2>
              {errors.has_contamination && (
                <Text type="danger">{errors.has_contamination}</Text>
              )}
            </Col>
            <Col
              md={12}
              style={{
                textAlign: 'center',
              }}
            >
              <Radio.Group
                name="has_contamination"
                buttonStyle="solid"
                value={this.props.has_contamination}
                onChange={this.handleOnChange}
              >
                <Radio.Button
                  className="inputprop radioprop radiosi form1"
                  value="yes"
                >
                  Si
                </Radio.Button>
                <Radio.Button
                  className="inputprop radioprop radiono form1"
                  value="no"
                >
                  No
                </Radio.Button>
                <Radio.Button
                  className="inputprop radioprop radiono form1"
                  value="unknown"
                >
                  No sé
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

ContaminationStep.propTypes = {
  has_contamination: PropTypes.string,
  next: PropTypes.func,
  previous: PropTypes.func,
  handleChange: PropTypes.func,
  onClose: PropTypes.func,
};

export default ContaminationStep;
