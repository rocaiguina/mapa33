import React from 'react';
import PropTypes from 'prop-types';
import { Col, Radio, Row } from 'antd';

import BaseLayout from '../../layout/base';
import BottomNavigator from '../BottomNavigator';
import TopNavigator from '../TopNavigator';
import Progress from '../Progress';

class InheritanceLandStep extends React.Component {
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
          <Progress onNext={this.handleOnNext} step={7} steps={21} />
        }
      >
        <div className="main-content m-t-20">
          <TopNavigator previous={this.props.previous} step={7} steps={21} />
          <Row gutter={30}>
            <Col
              md={12}
              style={{
                textAlign: 'center',
              }}
            >
              <h2>¿El terreno es parte de una herencia?</h2>
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
};

export default InheritanceLandStep;
