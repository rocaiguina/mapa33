import React from 'react';
import PropTypes from 'prop-types';
import { Col, Input, Radio, Row, Typography } from 'antd';

import BaseLayout from '../../layout/base';
import BottomNavigator from '../BottomNavigator';
import TopNavigator from '../TopNavigator';
import Progress from '../Progress';

const { TextArea } = Input;
const { Text } = Typography;

class AlreadyProposedUsesStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasContamination: props.has_already_proposed_uses == 'yes',
      errors: {},
    };
  }

  handleOnChange = e => {
    this.props.handleChange(e);
    this.setState({
      hasContamination: e.target.value === 'yes',
    });
  };

  handleOnNext = () => {
    if (this.props.has_already_proposed_uses !== null) {
      this.props.next();
    } else {
      this.setState({
        errors: { has_already_proposed_uses: 'Campo requerido' },
      });
    }
  };

  render() {
    const { errors, hasContamination } = this.state;
    return (
      <BaseLayout
        title="FORMULARIO DE PROPUESTA"
        onClose={this.props.onClose}
        footerXs={[14, 0, 10]}
        showCloseBtn={true}
        footerRightComponent={
          <Progress onNext={this.handleOnNext} step={15} steps={20} />
        }
      >
        <div className="main-content">
          <TopNavigator previous={this.props.previous} step={15} steps={20} />
          <Row gutter={30}>
            <Col
              md={12}
              style={{
                textAlign: 'center',
              }}
            >
              <h2>¿Hay algún uso ya propuesto para este terreno?</h2>
              {errors.has_already_proposed_uses && (
                <Text type="danger">{errors.has_already_proposed_uses}</Text>
              )}
            </Col>
            <Col
              md={12}
              style={{
                textAlign: 'center',
              }}
            >
              <Radio.Group
                name="has_already_proposed_uses"
                buttonStyle="solid"
                value={this.props.has_already_proposed_uses}
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

              {hasContamination && (
                <div className="text-left">
                  <label>Describe el tipo de uso propuesto:</label>
                  <TextArea
                    name="proposed_uses_description"
                    className="form-control"
                    value={this.props.proposed_uses_description}
                    onChange={this.props.handleChange}
                    rows={4}
                    maxLength="150"
                  />
                </div>
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

AlreadyProposedUsesStep.propTypes = {
  has_already_proposed_uses: PropTypes.string,
  proposed_uses_description: PropTypes.string,
  next: PropTypes.func,
  previous: PropTypes.func,
  handleChange: PropTypes.func,
  onClose: PropTypes.func,
};

export default AlreadyProposedUsesStep;
