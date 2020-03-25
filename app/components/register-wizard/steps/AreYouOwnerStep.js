import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Radio } from 'antd';

import BaseLayout from '../../layout/base';
import BottomNavigator from '../BottomNavigator';
import TopNavigator from '../TopNavigator';
import Progress from '../Progress';

class AreYouOwnerStep extends React.Component {
  handleOnChange = e => {
    const self = this;
    this.props.handleChange(e);
    setTimeout(function() {
      self.props.next();
    }, 400);
  };

  handleOnNext = () => {
    // TODO: validate before continue.
    this.props.next();
  };

  render() {
    return (
      <BaseLayout
        title="FORMULARIO DE PROPUESTA"
        footerXs={[14, 0, 10]}
        showCloseBtn={true}
        footerRightComponent={
          <Progress onNext={this.handleOnNext} step={4} steps={21} />
        }
      >
        <div className="main-content m-t-20">
          <TopNavigator previous={this.props.previous} step={4} steps={21} />
          <Row gutter={30}>
            <Col
              md={12}
              style={{
                textAlign: 'center',
              }}
            >
              <h2>¿Eres Dueño del terreno?</h2>
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
};

export default AreYouOwnerStep;
