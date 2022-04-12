import React from 'react';
import PropTypes from 'prop-types';
import { Col, Input, Radio, Row, Typography } from 'antd';

import BaseLayout from '../../layout/base';
import BottomNavigator from '../BottomNavigator';
import TopNavigator from '../TopNavigator';
import Progress from '../Progress';

const { TextArea } = Input;
const { Text } = Typography;

class ControversiesStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasContamination: props.has_controversies == 'yes',
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
    if (this.props.has_controversies !== null) {
      this.props.next();
    } else {
      this.setState({
        errors: { has_controversies: 'Campo requerido' },
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
          <Progress onNext={this.handleOnNext} step={14} steps={17} />
        }
      >
        <div className="main-content">
          <TopNavigator previous={this.props.previous} step={14} steps={17} />
          <Row gutter={30}>
            <Col
              md={12}
              style={{
                textAlign: 'center',
              }}
            >
              <h2>
                ¿Existen controversias de herencia, titularidad, registro de
                propiedad o de alguna otra índole legal?
              </h2>
              {errors.has_controversies && (
                <Text type="danger">{errors.has_controversies}</Text>
              )}
            </Col>
            <Col
              md={12}
              style={{
                textAlign: 'center',
              }}
            >
              <Radio.Group
                name="has_controversies"
                buttonStyle="solid"
                value={this.props.has_controversies}
                onChange={this.handleOnChange}
              >
                <Radio.Button
                  className="inputprop radioprop radiosi form1"
                  value="yes"
                >
                  Sí
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
                  <label>Explica más aquí:</label>
                  <TextArea
                    name="controversies_description"
                    className="form-control"
                    value={this.props.controversies_description}
                    onChange={this.props.handleChange}
                    rows={4}
                    maxLength="200"
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

ControversiesStep.propTypes = {
  has_controversies: PropTypes.string,
  controversies_description: PropTypes.string,
  next: PropTypes.func,
  previous: PropTypes.func,
  handleChange: PropTypes.func,
  onClose: PropTypes.func,
};

export default ControversiesStep;
