import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Radio, Typography } from 'antd';

import BaseLayout from '../../layout/base';
import BottomNavigator from '../BottomNavigator';
import TopNavigator from '../TopNavigator';
import Progress from '../Progress';

const { Text } = Typography;

class AreYouOwnerStep extends React.Component {
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
    if (this.props.are_u_owner !== null) {
      this.props.next();
    } else {
      this.setState({
        errors: { are_u_owner: 'Campo requerido' },
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
          <Progress onNext={this.handleOnNext} step={6} steps={20} />
        }
      >
        <div className="main-content">
          <TopNavigator previous={this.props.previous} step={6} steps={20} />
          <Row gutter={30}>
            <Col
              md={12}
              style={{
                textAlign: 'center',
              }}
            >
              <h2>¿Eres Dueño del terreno?</h2>
              {errors.are_u_owner && (
                <Text type="danger">{errors.are_u_owner}</Text>
              )}
            </Col>
            <Col
              md={12}
              style={{
                textAlign: 'center',
              }}
            >
              <Radio.Group
                name="are_u_owner"
                buttonStyle="solid"
                value={this.props.are_u_owner}
                onChange={this.handleOnChange}
              >
                <Radio.Button
                  className="inputprop radioprop radiosi form1"
                  value={true}
                >
                  Si
                </Radio.Button>
                <Radio.Button
                  className="inputprop radioprop radiono form1"
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

AreYouOwnerStep.propTypes = {
  are_u_owner: PropTypes.bool,
  next: PropTypes.func,
  previous: PropTypes.func,
  handleChange: PropTypes.func,
  onClose: PropTypes.func,
};

export default AreYouOwnerStep;
