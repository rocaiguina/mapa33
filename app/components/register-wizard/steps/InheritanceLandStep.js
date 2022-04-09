import React from 'react';
import PropTypes from 'prop-types';
import { Col, Radio, Row, Typography } from 'antd';

import BaseLayout from '../../layout/base';
import BottomNavigator from '../BottomNavigator';
import TopNavigator from '../TopNavigator';
import Progress from '../Progress';

const { Text } = Typography;

class InheritanceLandStep extends React.Component {
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
    if (this.props.inheritance_land !== null) {
      this.props.next();
    } else {
      this.setState({
        errors: { inheritance_land: 'Campo requerido' },
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
          <Progress onNext={this.handleOnNext} step={8} steps={21} />
        }
      >
        <div className="main-content">
          <TopNavigator previous={this.props.previous} step={8} steps={21} />
          <Row gutter={30}>
            <Col
              md={12}
              style={{
                textAlign: 'center',
              }}
            >
              <h2>¿El terreno es parte de una herencia?</h2>
              {errors.inheritance_land && (
                <Text type="danger">{errors.inheritance_land}</Text>
              )}
            </Col>
            <Col
              md={12}
              style={{
                textAlign: 'center',
              }}
            >
              <Radio.Group
                name="inheritance_land"
                buttonStyle="solid"
                value={this.props.inheritance_land}
                onChange={this.handleOnChange}
              >
                <Radio.Button
                  className="inputprop radioprop radiosi form2"
                  value={true}
                >
                  Si
                </Radio.Button>
                <Radio.Button
                  className="inputprop radioprop radiono form2"
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

InheritanceLandStep.propTypes = {
  inheritance_land: PropTypes.bool,
  next: PropTypes.func,
  previous: PropTypes.func,
  handleChange: PropTypes.func,
  onClose: PropTypes.func,
};

export default InheritanceLandStep;
