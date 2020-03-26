import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row } from 'antd';
import Icon from '../ui/Icon';

class TopNavigator extends React.Component {
  render() {
    const { disabledPrevious, previous, step, steps } = this.props;
    return (
      <Row gutter={30} className="visible-xs">
        <Col span={12}>
          {!disabledPrevious && (
            <Button className="ant-btn-white" onClick={previous} shape="round">
              <Icon type="arrow-left-2" />
            </Button>
          )}
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
