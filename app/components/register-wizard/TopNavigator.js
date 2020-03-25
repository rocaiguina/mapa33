import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row } from 'antd';

class TopNavigator extends React.Component {
  render() {
    const { disabledPrevious, previous, step, steps } = this.props;
    return (
      <Row gutter={30} className="visible-xs">
        <Col span={12}>
          {!disabledPrevious && <Button onClick={previous}>Back</Button>}
        </Col>
        <Col span={12}>
          <p className="text-right">
            <strong>Paso:</strong>
            <br />
            {step} de {steps}
          </p>
        </Col>
      </Row>
    );
  }
}

TopNavigator.propTypes = {
  disabledPrevious: PropTypes.bool,
  previous: PropTypes.func,
  step: PropTypes.number,
  steps: PropTypes.number,
};

export default TopNavigator;
